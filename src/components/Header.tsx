import { MenuIcon } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(useGSAP, CustomEase);

function Header() {
  useGSAP(() => {
    // Create a custom ease
    CustomEase.create("myEase", "0.25,1,0.5,1");

    gsap.from("header", {
      y: 20,
      autoAlpha: 0,
      duration: 1.4,
      delay: 3,
      ease: "myEase",
    });
  });

  return (
    <header className="flex w-full items-center justify-between px-8 pt-4 lg:w-5xl">
      <span className="font-title text-xl font-semibold">Monica Bellucci</span>
      <MenuIcon className="size-5 cursor-pointer" />
    </header>
  );
}

export default Header;
