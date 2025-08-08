"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { memo } from "react";

const stacks = [
  { src: "/tech-stack/HTML.png" },
  { src: "/tech-stack/CSS.png" },
  { src: "/tech-stack/JS.png" },
  { src: "/tech-stack/Typescript.png" },
  { src: "/tech-stack/REACT.png" },
  { src: "/tech-stack/nextjs.png" },
  { src: "/tech-stack/tailwind.png" },
  { src: "/images/github.png" },
];

type StackImageProps = {
  src: string;
  size?: number;
};

function StackImageComponent({ src, size = 30 }: StackImageProps) {
  return (
    <Image
      src={src}
      alt="tech stack icon"
      width={size}
      height={size}
      quality={100}
      className="object-contain drop-shadow-[0_0_4px_white] mx-2"
    />
  );
}
const StackImage = memo(StackImageComponent);

function ScrollingStacksComponent() {
  const renderStacks = stacks.map((stack) => (
    <div
      key={stack.src}
      className="relative w-12 sm:w-15 md:w-20 lg:w-27 h-12 sm:h-15 md:h-20 lg:h-27 mr-10 md:mr-18 lg:mr-30"
    >
      <Image
        src={stack.src}
        alt="tech icon"
        fill
        quality={100}
        className="object-contain drop-shadow-[0_0_4px_white]"
      />
    </div>
  ));

  return (
    <div className="relative w-full h-[10rem] overflow-hidden">
      <div className="Blurred w-full absolute top-1">
        <div className="flex h-[9rem]">
          {[...Array(2)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ x: 0 }}
              animate={{ x: "-100%" }}
              transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
              className="flex flex-shrink-0"
            >
              {renderStacks}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
const ScrollingStacks = memo(ScrollingStacksComponent);

function TechStackComponent() {
  return (
    <div className="flex gap-4 flex-col items-center w-full">
      <div className="flex flex-wrap gap-2 justify-center">
        {stacks.map((stack) => (
          <StackImage key={stack.src} src={stack.src} />
        ))}
      </div>

      <h2 className="text-2xl font-bold">Tech Stack</h2>

      <ScrollingStacks />
    </div>
  );
}
const TechStack = memo(TechStackComponent);

export default TechStack;
