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
          <h1 className="text-center text-5xl font-bold mb-10 px-2 py-10">
            PROJECTS
          </h1>
          <p className="mx-auto mb-8 max-w-3xl px-4 text-center text-sm leading-7 text-muted-foreground md:text-base">
            A collection of projects that reflect both my personal work and my
            learning journey. Some of these were built through self-study,
            guided practice, or course-based exercises, and I include them here
            to show the skills I developed while giving proper credit to the
            learning resources that helped shape them.
          </p>
          <ProjectCard />
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
