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
    src: "/images/project1.png",
  },
  {
    src: "/images/project2.png",
  },
];

const ProjectSection = () => {
  return (
    <section
      id="projects"
      className="w-full h-[50rem] flex items-center justify-between mt-40 "
    >
      <div className="w-full flex flex-col items-center justify-center">
        <Carousel
          className="w-full md:w-[70%] mb-12 mt-10 "
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
                className="relative h-[15rem] mx-2 md:h-[25rem]"
              >
                <Image src={project.src} alt="project images" fill />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10" />
          <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10" />
        </Carousel>
        <div className="w-full h-[30rem] overflow-y-auto">
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
