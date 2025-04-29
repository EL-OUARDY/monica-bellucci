/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Variants } from "motion/react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function anim(animate: string, variants: Variants, custom: any = null) {
  return {
    initial: "initial",
    animate,
    exit: "exit",
    variants,
    custom,
  };
}
