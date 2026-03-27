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
          <div className="mx-auto mb-10 w-[92%] max-w-4xl px-4">
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
              <div className="border-b border-border px-5 py-4">
                <h2 className="text-lg font-semibold md:text-xl">
                  KalikaScan Tutorial
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  A quick walkthrough showing how to use KalikaScan.
                </p>
              </div>
              <div className="aspect-video w-full">
                <iframe
                  className="h-full w-full"
                  src="https://www.youtube.com/embed/IeY4rr_2zDg"
                  title="KalikaScan tutorial video"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
          <ProjectCard />
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
