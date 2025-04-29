import { useRef } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const IMG_SIZE = {
  width: 324,
  height: 400,
};

const INTRO_IMAGES = [
  "1.webp",
  "2.webp",
  "3.webp",
  "4.webp",
  "5.webp",
  "6.webp",
  "main.webp",
];

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

    // Set images container initial position
    gsap.set(imgsContainerRef.current, {
      y: -window.innerHeight / 2 + IMG_SIZE.height / 2,
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
            duration: 0.2,
            ease: "power4.inOut",
          },
          onComplete: () => {
            tl.pause(); // pause the animation on complete.
          },
        });

        // Iterate over each image and create the animation
        images.forEach((img, index) => {
          tl.to(img, { autoAlpha: 1 }); //fade in the image
          if (index < images.length - 1) {
            tl.to(img, { autoAlpha: 0 }); // fade out the image, if is not the last one
          }
        });

        // Animating imgs container
        tl.to(imgsContainerRef.current, {
          y: 0,
          width: "100%",
          duration: 0.8,
          delay: 0.2,
          ease: "power2.inOut",
        }).to(
          images[images.length - 1],
          {
            y: -750,
            duration: 0.8,
            ease: "power2.inOut",
          },
          "<",
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
    <main className="flex size-full flex-1 flex-col items-center justify-end gap-8">
      {/* Titles */}
      <div className="flex hidden w-fit flex-col px-8">
        <motion.div className="text-muted-foreground mt-1 flex items-center justify-between py-4 text-lg">
          <div className="hover:underline">Monica Bellucci</div>
          <div className="hover:underline">
            <a
              href="https://www.instagram.com/monicabellucciofficiel"
              className=""
            >
              @monicabellucciofficiel
            </a>
          </div>
        </motion.div>
        <h2 className="font-title text-center text-8xl tracking-wider">
          Monica Bellucci
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
            src={`/src/assets/img/${img}`}
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
