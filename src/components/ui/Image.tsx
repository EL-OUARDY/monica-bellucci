import { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";
import { motion } from "motion/react";

interface Props {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  containerClassName?: string;
  placeHolder?: string;
  zoom?: boolean;
}

function Image({
  className,
  containerClassName,
  src,
  alt,
  width,
  height,
  placeHolder = "",
  zoom = false,
}: Props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!imgRef.current) return;
    imgRef.current.addEventListener("load", () => setIsLoaded(true));
  }, []);

  return (
    <div
      className={cn(
        "relative mx-auto w-fit overflow-hidden",
        containerClassName,
      )}
    >
      {placeHolder && (
        <div
          className={cn(
            "absolute inset-0 z-1 bg-cover bg-center blur-xl",
            !isLoaded && "animate-soft-pulse",
          )}
          style={{
            backgroundImage: `url(${placeHolder})`,
            width,
            height,
          }}
        ></div>
      )}

      <motion.img
        ref={imgRef}
        alt={alt}
        src={src}
        whileHover={zoom ? { scale: 1.1 } : {}}
        transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
        className={cn(
          "relative z-2 object-center transition-opacity duration-[300ms] ease-in-out",
          isLoaded ? "opacity-100" : "opacity-0",
          className,
        )}
        style={{ width, height }}
        loading="lazy"
      />
    </div>
  );
}

export default Image;
