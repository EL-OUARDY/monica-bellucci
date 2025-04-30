import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { INTRO_IMAGES } from "../lib/images";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(useGSAP, CustomEase);

const IMG_SIZE = {
  width: 324,
  height: 400,
};

function Hero() {
  const imgsContainerRef = useRef<HTMLDivElement>(null);

  // Array of references for each into image
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

    // Initialize animation properties
    gsap.set(imgsContainerRef.current, {
      y: -window.innerHeight / 2 + IMG_SIZE.height / 2,
    });
    gsap.set(".firstname .letter", {
      y: 140,
    });
    gsap.set(".lastname .letter", {
      y: 140,
    });
    gsap.set(".hero-info", {
      opacity: 0,
      y: 20,
    });

    let loadedCount = 0;
    const totalImages = images.length;

    // Function to check if all images are loaded
    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount === totalImages) {
        // Animation sequence
        // Create a new GSAP timeline
        const tl = gsap.timeline({
          defaults: {
            duration: 0.15,
            ease: "myEase",
          },
          onComplete: () => {
            tl.pause(); // pause the animation on complete.
            console.log("Timeline duration: " + tl.duration());
          },
        });

        // Iterate over each image and create the animation
        images.forEach((img, index) => {
          tl.to(img, {
            autoAlpha: 1,
          }); //fade in the image
          if (index < images.length - 1) {
            tl.to(img, {
              autoAlpha: 0,
              onComplete: () => {
                // Remove the image from DOM after fade out
                if (img) img.parentNode?.removeChild(img);
              },
            }); // Fade out the image, if is not the last one
          }
        });

        // Animating imgs container
        tl.to(imgsContainerRef.current, {
          y: 0,
          width: "100%",
          duration: 1.4,
          delay: 0.4,
        }).to(
          images[images.length - 1],
          {
            y: -750,
            duration: 1.4,
          },
          "<",
        );

        // Animate Hero model name
        // Animate first name letters, staggering from the end (reverse)
        tl.to(
          ".firstname .letter",
          {
            y: 0,
            duration: 1,
            stagger: { each: 0.04, from: "end" },
          },
          "-=1",
        );

        // Animate last name letters, normal stagger (from the start)
        tl.to(
          ".lastname .letter",
          {
            y: 0,
            duration: 1,
            stagger: { each: 0.04, from: "start" },
          },
          "<",
        );

        // Animate info hero text
        tl.to(
          ".hero-info",
          {
            opacity: 1,
            y: 0,
            duration: 1.4,
          },
          "-=0.8",
        );
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
    <main className="flex size-full flex-1 flex-col items-center justify-end gap-4">
      {/* Titles */}
      <div className="hero-text flex w-fit flex-col overflow-hidden px-8">
        <div className="hero-info text-muted-foreground -mb-4 flex items-center justify-between text-lg">
          <div className="hover:underline">Model/Actress</div>
          <div className="hover:underline">
            <a
              target="_blank"
              href="https://www.instagram.com/monicabellucciofficiel"
              className=""
            >
              @MonicaBellucciOfficiel
            </a>
          </div>
        </div>
        <h2 className="font-title flex gap-6 text-center text-[7rem] tracking-wide">
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
            className="absolute inset-0 w-full opacity-0"
          />
        ))}
      </div>
    </main>
  );
}

export default Hero;
