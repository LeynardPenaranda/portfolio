"use client";

import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Image from "next/image";
import ProjectCard from "./projects-cards";

const image = [
  {
    src: "/banners/bannerPort.png",
  },
  {
    src: "/banners/banner2.png",
  },
  {
    src: "/banners/banner3.png",
  },
];

const ProjectSection = () => {
  return (
    <section
      id="projects"
      className="w-full h-[50rem] flex items-center justify-between mt-50 "
    >
      <div className="w-full flex flex-col items-center justify-center">
        <Carousel
          className="w-full  lg:w-[80%] mb-12 mt-10 "
          opts={{
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 2000,
              stopOnInteraction: true,
              stopOnMouseEnter: true,
            }),
          ]}
        >
          <CarouselContent>
            {image.map((project) => (
              <CarouselItem
                key={project.src}
                className="h-[15rem] mx-2 md:h-[25rem] relative"
              >
                <Image
                  src={project.src}
                  alt="project images"
                  width="0"
                  height="0"
                  sizes="100vw"
                  className="w-full"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10" />
          <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10" />
        </Carousel>
        <div className="w-full h-[50rem] overflow-y-auto ">
          <h1 className="text-center text-5xl font-bold mb-10 px-2">
            PROJECTS - Ongoing
          </h1>
          <ProjectCard />
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
