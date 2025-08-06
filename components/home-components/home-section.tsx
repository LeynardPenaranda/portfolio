"use client";

import { Github, Linkedin, Mails } from "lucide-react";
import DescriptionProfile from "./home-description";
import ProfileImage from "./profile-images";
import TechStack from "./tech-stack";
import { motion } from "framer-motion";
import Link from "next/link";

const HomeComponent = () => {
  return (
    <>
      <motion.section
        id="home"
        className="w-full  scroll-mt-20"
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
          <div className="flex flex-col w-full md:w-[50%]">
            <DescriptionProfile />
            <p className="w-full mt-10 text-center">
              Hi, I’m Leynard Peñaranda — a junior developer building modern,
              responsive web apps with <b>React</b>, <b>Next.js</b>, and{" "}
              <b>Tailwind CSS</b>. I also bring a solid foundation in
              cybersecurity to ensure secure and user-friendly experiences.
            </p>
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
          <ProfileImage />
        </div>
      </motion.section>
      <div className="w-full mt-10 md:mt-0 flex items-start justify-center  ">
        {/* <TechStack /> */}
        <div className="container mx-auto overflow-x-hidden">
          <TechStack />
        </div>
      </div>
    </>
  );
};

export default HomeComponent;
