import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CustomEase } from "gsap/CustomEase";
import Header from "../Header";
import { IMG_SIZE, INTRO_IMAGES } from "./constants";
import { createHeroTimeline, initializeAnimations } from "./animations";
import clsx from "clsx";
import { useCustomCursor } from "../../contexts/CursorContext";

gsap.registerPlugin(useGSAP, CustomEase);

function Hero() {
  const imgsContainerRef = useRef<HTMLDivElement>(null);
  const { setCustomCursorState } = useCustomCursor();

  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  // Array of references for each image
  const imgRefs = Array(INTRO_IMAGES.length)
    .fill(null)
    .map(() =>
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useRef<HTMLImageElement>(null),
    );

  useGSAP(() => {
    // Maps over the `imgRefs` array to extract the current DOM elements
    // from each ref then filter out null values.
    const images = imgRefs.map((ref) => ref.current).filter(Boolean);

    if (!imgsContainerRef.current || images.length === 0) return;

    // Create a custom ease
    CustomEase.create("myEase", "0.25,1,0.5,1");
    initializeAnimations(imgsContainerRef.current);

    let loadedCount = 0;
    const totalImages = images.length;

    // Function to check if all images are loaded
    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount === totalImages) {
        timelineRef.current = createHeroTimeline(
          imgsContainerRef.current!,
          images as HTMLImageElement[],
        );

        // Add onComplete callback to the timeline
        timelineRef.current.eventCallback("onStart", () => {
          setIsAnimationComplete(false);
        });
        timelineRef.current.eventCallback("onComplete", () => {
          setIsAnimationComplete(true);
        });
      }
    };

    // Assign load event and handle completed images
    images.forEach((img) => {
      if (!img) return;
      img.onload = checkAllLoaded;

      if (img.complete) {
        checkAllLoaded();
      }
    });
  });

  return (
    <>
      <Header
        onLogoClick={() => {
          if (timelineRef.current) {
            timelineRef.current.restart();
          }
        }}
      />
      {/* Hero content */}
      <main className="flex size-full flex-1 flex-col items-center justify-end gap-4">
        {/* Titles */}
        <div className="hero-text flex w-fit flex-col overflow-hidden px-8">
          <div className="hero-info text-foreground/80 font-title -mb-2 flex items-center justify-between text-sm sm:-mb-4 sm:px-8 sm:text-base md:px-10 lg:px-12">
            <div className="hover:underline">Model/Actress</div>
            <div className="hover:underline">
              <a
                target="_blank"
                href="https://www.instagram.com/monicabellucciofficiel"
                className="cursor-none"
              >
                @MonicaBellucciOfficiel
              </a>
            </div>
          </div>
          <h2
            onMouseOver={() =>
              isAnimationComplete && setCustomCursorState("blend")
            }
            onMouseLeave={() =>
              isAnimationComplete && setCustomCursorState("default")
            }
            className="model-name font-title flex gap-6 text-center text-[2.8rem] tracking-wide sm:px-8 sm:text-[5rem] md:px-10 md:text-[6rem] lg:px-12 lg:text-[7rem]"
          >
            <div className="firstname">
              {"Monica".split("").map((ch, i) => (
                <span key={i} className="letter inline-block">
                  {ch}
                </span>
              ))}
            </div>
            <span className="lastname">
              {"Bellucci".split("").map((ch, i) => (
                <span key={i} className="letter inline-block">
                  {ch}
                </span>
              ))}
            </span>
          </h2>
        </div>

        {/* images */}
        <div
          ref={imgsContainerRef}
          style={{ ...IMG_SIZE }}
          className="relative w-full overflow-hidden text-center"
        >
          {INTRO_IMAGES.map((img, index) => (
            <img
              ref={imgRefs[index]}
              key={index}
              src={img}
              alt="Monica Bellucci"
              {...IMG_SIZE}
              className={clsx(
                "absolute inset-0 w-full opacity-0",
                index === INTRO_IMAGES.length - 1 && "main-img",
              )}
              onMouseOver={() => gsap.to(".main-img", { scale: 1.05 })}
              onMouseLeave={() => gsap.to(".main-img", { scale: 1 })}
            />
          ))}
        </div>
      </main>
    </>
  );
}

export default Hero;
