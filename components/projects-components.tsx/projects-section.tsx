"use client";
import ProjectCard from "./projects-cards";

const ProjectSection = () => {
  return (
    <section
      id="projects"
      className="w-full flex flex-col items-center justify-between py-10"
    >
      <div className="w-full flex flex-col items-center justify-center">
        <div className="w-full">
          <h1 className="text-center text-5xl font-bold mb-10 px-2 sticky top-0 z-50 bg-background py-10">
            PROJECTS
          </h1>
          <ProjectCard />
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
