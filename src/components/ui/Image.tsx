import { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";
import { motion } from "motion/react";

interface Props {
  src: string;
  alt: string;
  className?: string;
  width: string;
  height: string;
  placeHolder?: string;
}

function Image({
  className,
  src,
  alt,
  width,
  height,
  placeHolder = "",
}: Props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!imgRef.current) return;
    imgRef.current.addEventListener("load", () => setIsLoaded(true));
  }, []);

  return (
    <div className="relative overflow-hidden">
      <div
        className={cn(
          "absolute inset-0 z-1 bg-cover bg-center blur-xl",
          !isLoaded && "animate-soft-pulse",
        )}
        style={{
          backgroundImage: `url(${placeHolder})`,
        }}
      ></div>

      <motion.img
        ref={imgRef}
        alt={alt}
        src={src}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
        className={cn(
          "relative z-2 object-center transition-opacity duration-[500ms] ease-in-out",
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
