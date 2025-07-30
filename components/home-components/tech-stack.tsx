"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
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
    <div className="flex gap-4 md:ml-20 flex-col md:flex-row  items-center  w-full">
      <h2>Tech Stack |</h2>
      <ul className="flex items-center gap-4">
        {stacks.map((stack) => (
          <AnimatePresence key={stack.src}>
            <motion.li
              initial={{
                rotate: "0deg",
                scale: 0,
              }}
              animate={{
                rotate: "360deg",
                scale: 1,
                y: [0, 30, -30, -50, 0],
              }}
              exit={{
                rotate: "0deg",
                scale: 0,
              }}
              transition={{
                duration: 1,
                ease: "backInOut",
                times: [0, 0.15, 0.5, 0.85, 1],
              }}
            >
              <Image
                src={stack.src}
                alt="stack"
                width={40}
                height={40}
                className="rounded-sm"
              />
            </motion.li>
          </AnimatePresence>
        ))}
      </ul>
    </div>
  );
};

export default TechStack;
