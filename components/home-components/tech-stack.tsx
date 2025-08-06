"use client";
import Image from "next/image";
import { motion } from "framer-motion";
const stacks = [
  {
    src: "/tech-stack/HTML.png",
  },
  {
    src: "/tech-stack/CSS.png",
  },
  {
    src: "/tech-stack/JS.png",
  },
  {
    src: "/tech-stack/Typescript.png",
  },
  {
    src: "/tech-stack/REACT.png",
  },
  {
    src: "/tech-stack/nextjs.png",
  },
  {
    src: "/tech-stack/tailwind.png",
  },
  {
    src: "/images/github.png",
  },
];
const TechStack = () => {
  return (
    <div className="flex gap-4 flex-col items-center w-full">
      <div className="flex flex-wrap gap-2 justify-center">
        {stacks.map((stack) => (
          <Image
            key={stack.src}
            src={stack.src}
            alt="images"
            width={30}
            height={30}
            className="drop-shadow-[0_0_4px_white] mx-2"
          />
        ))}
      </div>

      <h2 className="text-2xl font-bold">Tech Stack</h2>
      <div className="relative w-full h-[8rem]">
        <div className="Blurred w-full absolute">
          <div className="flex">
            <motion.div
              initial={{
                x: 0,
              }}
              animate={{
                x: "-100%",
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear",
              }}
              className="flex flex-shrink-0"
            >
              {stacks.map((stack) => (
                <div
                  className="relative w-12 lg:w-32 h-12 lg:h-32 mr-15 md:mr-30"
                  key={stack.src}
                >
                  <Image
                    src={stack.src}
                    alt="images"
                    fill
                    quality={100}
                    className="object-contain drop-shadow-[0_0_4px_white]"
                  />
                </div>
              ))}
            </motion.div>
            <motion.div
              initial={{
                x: 0,
              }}
              animate={{
                x: "-100%",
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear",
              }}
              className="flex flex-shrink-0"
            >
              {stacks.map((stack) => (
                <div
                  className="relative w-12 lg:w-32 h-12 lg:h-32 mr-15 md:mr-30"
                  key={stack.src}
                >
                  <Image
                    src={stack.src}
                    alt="images"
                    fill
                    quality={100}
                    className="object-contain drop-shadow-[0_0_4px_white]"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechStack;
