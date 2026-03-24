"use client";

import Image from "next/image";
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
      className="relative w-16 sm:w-20 md:w-24 lg:w-32 h-16 sm:h-20 md:h-24 lg:h-32 mr-10 md:mr-18 lg:mr-30"
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
    <div className="relative w-full h-[12rem] overflow-x-hidden">
      <div className="pointer-events-none absolute left-0 top-0 h-full w-[5vw] bg-gradient-to-r from-background to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-[5vw] bg-gradient-to-l from-background to-transparent z-10" />
      <div className="w-full absolute top-1">
        <div className="flex h-[11rem]">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex flex-shrink-0 animate-scroll">
              {renderStacks}
            </div>
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

      <h2 className="text-2xl font-bold">Other Tech Stack</h2>

      <ScrollingStacks />
    </div>
  );
}
const TechStack = memo(TechStackComponent);

export default TechStack;
