import { useEffect, useState } from "react";
import { createContext, ReactNode, useContext } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "../lib/utils";

gsap.registerPlugin(useGSAP);

export type MouseState = "blend" | "transparent" | "hidden" | "default";

interface ICustomCursorContext {
  customCursorState: MouseState;
  setCustomCursorState: (MouseState: MouseState) => void;
}

const CustomCursorContext = createContext<ICustomCursorContext>(
  {} as ICustomCursorContext,
);

// custom hook to expose the CustomCursorContext
export function useCustomCursor() {
  return useContext(CustomCursorContext);
}

interface Props {
  children: ReactNode;
}

const MOUSE_SIZE = 24;

interface MousePosition {
  x: number | null;
  y: number | null;
}

function CustomCursorProvider({ children }: Props) {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: null,
    y: null,
  });

  const [mouseState, setMouseState] = useState<MouseState>("default");

  const scale = mouseState === "blend" ? 5 : 1;

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
      gsap.set(".custom-cursor", {
        autoAlpha: 1,
        x: e.clientX - (MOUSE_SIZE * scale) / 2,
        y: e.clientY - (MOUSE_SIZE * scale) / 2,
      });
    };

    window.addEventListener("mousemove", mouseMove);

    return () => window.removeEventListener("mousemove", mouseMove);
  }, [scale]);

  useGSAP(
    () => {
      if (mousePosition.x === null || mousePosition.y === null) return;
      gsap.to(".custom-cursor", {
        width: mouseState === "blend" ? MOUSE_SIZE * scale : MOUSE_SIZE,
        height: mouseState === "blend" ? MOUSE_SIZE * scale : MOUSE_SIZE,
        x: mousePosition.x - (MOUSE_SIZE * scale) / 2,
        y: mousePosition.y - (MOUSE_SIZE * scale) / 2,
        duration: 0.3,
      });
    },
    { dependencies: [mousePosition, mouseState] },
  );

  function setCustomCursorState(state: MouseState) {
    setMouseState(state);
  }

  return (
    <CustomCursorContext.Provider
      value={{
        customCursorState: mouseState,
        setCustomCursorState,
      }}
    >
      <div
        style={{ width: MOUSE_SIZE, height: MOUSE_SIZE }}
        className={cn(
          "custom-cursor bg-primary/50 pointer-events-none fixed inset-0 z-100 hidden rounded-full opacity-0 md:block",
          (mouseState === "blend" || mouseState === "transparent") &&
            "bg-background mix-blend-difference",
          mouseState === "hidden" && "hidden",
        )}
      />
      {children}
    </CustomCursorContext.Provider>
  );
}

export default CustomCursorProvider;
