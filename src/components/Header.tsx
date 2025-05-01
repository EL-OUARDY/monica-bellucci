import { MenuIcon } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CustomEase } from "gsap/CustomEase";
import { useCustomCursor } from "../contexts/CursorContext";

gsap.registerPlugin(useGSAP, CustomEase);

interface Props {
  onLogoClick: () => void;
}

function Header({ onLogoClick }: Props) {
  const { setCustomCursorState } = useCustomCursor();

  useGSAP(() => {
    // Create a custom ease
    CustomEase.create("myEase", "0.25,1,0.5,1");

    gsap.from("header", {
      y: 20,
      autoAlpha: 0,
      duration: 1.4,
      delay: 4,
      ease: "myEase",
    });
  });

  return (
    <header className="flex w-full items-center justify-between px-8 pt-4 lg:w-5xl">
      <span
        onClick={() => onLogoClick()}
        onMouseOver={() => setCustomCursorState("transparent")}
        onMouseLeave={() => setCustomCursorState("default")}
        className="font-title text-xl font-semibold"
      >
        Monica Bellucci
      </span>
      <MenuIcon
        onMouseOver={() => setCustomCursorState("transparent")}
        onMouseLeave={() => setCustomCursorState("default")}
        className="size-5"
      />
    </header>
  );
}

export default Header;
