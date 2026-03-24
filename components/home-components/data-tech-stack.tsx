"use client";

import Image from "next/image";
import { memo } from "react";

const stacks = [
  { src: "/tech-stack/apache-hive-logo.png" },
  { src: "/tech-stack/apache-kafka-logo.png" },
  { src: "/tech-stack/apache-spark-logo.png" },
  { src: "/tech-stack/postgresql-logo.png" },
  { src: "/tech-stack/python-logo.svg" },
  { src: "/tech-stack/apache-hadoop-hdfs-logo.png" },
  { src: "/tech-stack/docker-logo.png" },
  { src: "/tech-stack/apache-airflow-logo.png" },
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
      <div className="pointer-events-none absolute left-0 top-0 h-full w-[5vw] bg-gradient-to-r from-background to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-[5vw] bg-gradient-to-l from-background to-transparent z-10" />
      <div className="w-full absolute top-1">
        <div className="flex h-[11rem]">
          {[...Array(3)].map((_, i) => (
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

      <p className="max-w-2xl px-4 text-center text-sm text-gray-600">
        I am currently at a junior level with these technologies and have
        foundational, working familiarity with them through ongoing learning and
        hands-on practice.
      </p>

      <h2 className="text-2xl font-bold">BIG Data Tech Stack</h2>

      <ScrollingStacks />
    </div>
  );
}
const DataTechStack = memo(TechStackComponent);

export default DataTechStack;
