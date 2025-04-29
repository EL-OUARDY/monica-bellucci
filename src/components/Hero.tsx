import Image from "./ui/Image";
import modelImg from "../assets/img/model.webp";
import modelSmallImg from "../assets/img/model-small.webp";
import { motion } from "motion/react";

function Hero() {
  return (
    <main className="flex w-full flex-1 items-center justify-center">
      <div className="flex flex-col">
        <Image
          src={modelImg}
          alt="Monica Bellucci"
          width="324px"
          height="400px"
          placeHolder={modelSmallImg}
        />
        <motion.div className="text-bas text-muted-foreground mt-1 flex items-center justify-between font-semibold">
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
      </div>
    </main>
  );
}

export default Hero;
