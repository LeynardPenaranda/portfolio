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
    <div className="flex gap-4 flex-col md:flex-col  items-center ">
      <h2 className="text-2xl">Tech Stack</h2>
      <div className="container Blurred">
        <div className="flex gap-20">
          <motion.div
            initial={{
              x: 0,
            }}
            animate={{
              x: "-100%",
            }}
            transition={{
              duration: 60,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex flex-shrink-0 space-x-15"
          >
            {stacks.map((stack) => (
              <Image
                key={stack.src}
                src={stack.src}
                alt="images"
                width={110}
                height={110}
                className="drop-shadow-[0_0_4px_white]"
              />
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
              duration: 60,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex flex-shrink-0 space-x-15"
          >
            {stacks.map((stack) => (
              <Image
                key={stack.src}
                src={stack.src}
                alt="images"
                width={110}
                height={110}
                className="drop-shadow-[0_0_4px_white]"
              />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TechStack;
