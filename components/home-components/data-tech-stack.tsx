"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { memo } from "react";

const stacks = [
  { src: "/tech-stack/apache-hive-logo.png" },
  { src: "/tech-stack/apache-kafka-logo.png" },
  { src: "/tech-stack/apache-spark-logo.png" },
  { src: "/tech-stack/postgresql-logo.png" },
  { src: "/tech-stack/python-logo.svg" },
  { src: "/tech-stack/apache-hadoop-hdfs-logo.png" },
];

type StackImageProps = {
  src: string;
  size?: number;
};

function StackImageComponent({ src, size = 110 }: StackImageProps) {
  // Increased size
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
      className="relative w-24 sm:w-32 md:w-36 lg:w-40 h-24 sm:h-32 md:h-36 lg:h-40 mr-10 md:mr-18 lg:mr-30"
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
      <div className="w-full absolute top-1">
        <div className="flex h-[11rem]">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ x: 0 }}
              animate={{ x: "-100%" }}
              transition={{
                duration: 70,
                repeat: Infinity,
                ease: "linear",
              }}
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

      <h2 className="text-2xl font-bold">BIG Data Tech Stack</h2>

      <ScrollingStacks />
    </div>
  );
}
const DataTechStack = memo(TechStackComponent);

export default DataTechStack;
