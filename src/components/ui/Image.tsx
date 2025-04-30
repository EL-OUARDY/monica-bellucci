import { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";

interface Props {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  containerClassName?: string;
  placeHolder?: string;
}

/**
 * A custom image component with lazy loading and placeholder functionality.
 * This component provides a smooth loading experience by displaying a blurred placeholder
 * while the main image loads.
 *
 * @param props - The component props
 * @param props.className - Additional CSS classes to apply to the image element
 * @param props.containerClassName - Additional CSS classes to apply to the container div
 * @param props.src - The source URL of the main image
 * @param props.alt - The alt text for the image
 * @param props.width - The width of the image
 * @param props.height - The height of the image
 * @param props.placeHolder - The URL of the placeholder image to show while loading (optional)
 *
 * @example
 * ```tsx
 * <Image
 *   src="/path/to/image.jpg"
 *   alt="Description"
 *   width={300}
 *   height={200}
 *   placeHolder="/path/to/placeholder.jpg"
 * />
 * ```
 */
function Image({
  className,
  containerClassName,
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

      <img
        ref={imgRef}
        alt={alt}
        src={src}
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
