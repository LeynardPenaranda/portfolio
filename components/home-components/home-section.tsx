"use client";

import { Github, Linkedin, Mails } from "lucide-react";
import DescriptionProfile from "./home-description";
import ProfileImage from "./profile-images";
import TechStack from "./tech-stack";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import DataTechStack from "./data-tech-stack";

const HomeComponent = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    margin: "-100px",
  });
  return (
    <>
      <motion.section
        id="home"
        className="w-full pt-24 md:pt-20 scroll-mt-20"
        initial={{
          opacity: 0,
        }}
        whileInView={{
          opacity: 1,
        }}
        transition={{
          duration: 0.5,
        }}
      >
        <div className=" flex-col-reverse md:flex-row flex gap-5  items-center justify-center h-[50rem]">
          <div className="flex flex-col w-full md:w-[50%] px-5">
            <DescriptionProfile />
            <motion.p
              ref={ref}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mx-auto mt-10 w-full max-w-3xl text-center leading-relaxed"
            >
              I&apos;m <b>Leynard Pe&ntilde;aranda</b>, a junior developer and{" "}
              <b>4th-year BSIS student</b> with a passion for turning ideas into
              practical digital solutions. I enjoy working with <b>data</b>,{" "}
              <b>software development</b>, and <b>cybersecurity</b>, while
              continuously learning through hands-on projects. Take a look
              around to explore my experience, projects, certificates, and the
              technologies I work with.
            </motion.p>
            <div className="flex w-full items-center justify-center mt-4">
              <div className="flex items-center gap-5">
                <Link
                  href="https://www.linkedin.com/in/leynard-penaranda-40ab95337/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin />
                </Link>
                <Link
                  href="https://github.com/LeynardPenaranda"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github />
                </Link>
                <Link href="#contact">
                  <Mails />
                </Link>
              </div>
            </div>
          </div>
          <div>
            <ProfileImage />
          </div>
        </div>
      </motion.section>
      <div className="w-full overflow-x-hidden">
        <DataTechStack />
      </div>
      <div className="w-full overflow-x-hidden">
        <TechStack />
      </div>
    </>
  );
};

export default HomeComponent;
