import gsap from "gsap";
import { IMG_SIZE } from "./constants";

export const initializeAnimations = (imgsContainer: HTMLDivElement) => {
  // Initial states
  gsap.set(imgsContainer, {
    y: -window.innerHeight / 2 + IMG_SIZE.height / 2,
  });
  gsap.set(".firstname .letter", { y: 140 });
  gsap.set(".lastname .letter", { y: 140 });
  gsap.set(".hero-info", { opacity: 0, y: 30 });
};

export const createHeroTimeline = (
  imgsContainer: HTMLDivElement,
  images: HTMLImageElement[],
) => {
  // Create a new GSAP timeline
  const tl = gsap.timeline({
    defaults: {
      duration: 0.15,
      ease: "myEase",
    },
    onComplete: () => {
      tl.pause();
    },
  });

  // Image sequence animations
  images.forEach((img, index) => {
    tl.to(
      img,
      {
        autoAlpha: 1,
        duration: 0.15,
        delay: 0.3,
      },
      index === 0 ? "+=0" : "-=0.6",
    ); //fade in the image

    if (index < images.length - 1) {
      tl.to(img, {
        autoAlpha: 0,
        duration: 0.2,
      }); // fade out the image, if is not the last one
    }
  });

  // Images container animation
  tl.to(imgsContainer, {
    y: 0,
    width: "100%",
    height: window.innerHeight / 2,
    duration: 1.4,
    delay: 0.4,
  }).to(
    images[images.length - 1],
    {
      y: 0,
      duration: 1.4,
    },
    "<",
  );

  // Text animations
  tl.to(
    ".firstname .letter",
    {
      y: 0,
      duration: 1,
      stagger: { each: 0.04, from: "end" },
    },
    "-=1",
  )
    .to(
      ".lastname .letter",
      {
        y: 0,
        duration: 1,
        stagger: { each: 0.04, from: "start" },
      },
      "<",
    )
    .to(
      ".hero-info",
      {
        opacity: 1,
        y: 0,
        duration: 1.4,
      },
      "-=0.8",
    );

  return tl;
};
