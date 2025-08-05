"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

const CertificateCard = ({
  certificate,
  index,
  hoveredIndex,
  setHoveredIndex,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  certificate: any;
  index: number;
  hoveredIndex: number | null;
  setHoveredIndex: (index: number | null) => void;
}) => {
  const isHovered = hoveredIndex === index || hoveredIndex === null;

  return (
    <motion.div
      initial={{ opacity: 1, filter: "blur(0px)" }}
      animate={{
        opacity: isHovered ? 1 : 0.4,
        filter: isHovered ? "blur(0px)" : "blur(4px)",
        scale: isHovered ? 1.02 : 0.97,
      }}
      transition={{ duration: 0.2 }}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      className="w-[80%] mx-auto md:mx-0 mt-5 mb-5"
    >
      <Card className="grid grid-rows-2 sm:grid-rows-1 md:grid-cols-1 lg:grid-cols-[10rem_1fr] cursor-pointer transition-shadow hover:shadow-lg drop-shadow-[0_0_4px_white]">
        <div className="flex items-center justify-center">
          <Image
            src={certificate.image}
            alt={certificate.name}
            width={80}
            height={80}
            className="rounded-md"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_10rem] ">
          <CardHeader>
            <CardTitle>{certificate.name}</CardTitle>
            <CardDescription>Issued by: {certificate.issued}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="mt-5">
              <Link
                href={certificate.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Cert
              </Link>
            </Button>
          </CardContent>
        </div>
      </Card>
    </motion.div>
  );
};

const CertificateSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const cert = [
    {
      id: 1,
      name: "The Complete Full-Stack Web Development Bootcamp",
      image: "/images/udemy.png",
      issued: "udemy",
      link: "https://drive.google.com/file/d/1Ivin3pRCzz_xBgqWoMsYE5mUYGR5xXS6/view?usp=sharing",
    },
    {
      id: 2,
      name: "The Ultimate React Course 2025: React, Next.js, Redux & More",
      image: "/images/udemy.png",
      issued: "udemy",
      link: "https://drive.google.com/file/d/1kmNDpOCbZEOehdhIFjeILcrVg_wRDjUJ/view?usp=sharing",
    },
    {
      id: 3,
      name: "Next.js Ecommerce Shopping Platform from Scratch",
      image: "/images/udemy.png",
      issued: "udemy",
      link: "https://drive.google.com/file/d/1U7U3zI32BeiAQcznP2deW2NKaHAUyvzM/view?usp=sharing",
    },
    {
      id: 13,
      name: "Udemy Completed Course:Cybersecurity Hackers Exposed",
      image: "/images/udemy.png",
      issued: "udemy",
      link: "https://drive.google.com/file/d/1epX6ZQ7HCrusM8lfLW45i_k9VFjriLwd/view?usp=sharing",
    },
    {
      id: 4,
      name: "Introduction to Cybersecurity",
      image: "/images/cisco.png",
      issued: "cisco",
      link: "https://drive.google.com/file/d/1WBu-jY9rH7gG5YwwizT47xh72kfcbMt6/view?usp=sharing",
    },
    {
      id: 5,
      name: "Google Cybersecurity Professional Certificate V2",
      image: "/images/cyber.png",
      issued: "coursera",
      link: "https://www.credly.com/badges/4fddc47d-a1e3-40e6-985c-aedcfa62f2e9/public_url",
    },
    {
      id: 6,
      name: "Google Cybersecurity Certificate",
      image: "/images/google.png",
      issued: "coursera",
      link: "https://coursera.org/share/abfd5aa655e58a835ed847ce6a994d40",
    },
    {
      id: 7,
      name: "Foundation of Cybersecurity",
      image: "/images/google.png",
      issued: "coursera",
      link: "https://coursera.org/share/2e54444b0fa6415cb03197b705c969d3",
    },
    {
      id: 8,
      name: "Automate Cybersecurity Tasks with",
      image: "/images/google.png",
      issued: "coursera",
      link: "https://coursera.org/share/8158e002edb93391e66755ae810a1dc0",
    },
    {
      id: 9,
      name: "Assets, Threats, and Vulnerabilities",
      image: "/images/google.png",
      issued: "coursera",
      link: "https://coursera.org/share/31302ce0f4c7523a2d4b2ff361351ab3",
    },
    {
      id: 10,
      name: "Connect and Protect:Networks and Network Security",
      image: "/images/google.png",
      issued: "coursera",
      link: "https://coursera.org/share/ba673623adde563146244f21753e98b3",
    },
    {
      id: 11,
      name: "Play it Safe: Manage Security Risks",
      image: "/images/google.png",
      issued: "coursera",
      link: "https://coursera.org/share/25783f3e836bdf4898189d9a2ec38fab",
    },
    {
      id: 12,
      name: "Tools of the Trade: Linux",
      image: "/images/google.png",
      issued: "coursera",
      link: "https://coursera.org/share/02af6ce898d46900ee1cc42bd21407be",
    },
    {
      id: 14,
      name: "Mastercard Cybersecurity Job Simulation Certificate",
      image: "/images/forage.png",
      issued: "forage",
      link: "https://drive.google.com/file/d/1OPaGoESrR_JNYFb7xU-Qe0cRxHQGofXN/view?usp=sharing",
    },
    {
      id: 15,
      name: "Shield Up Cybersecurity Job Simulation Certificate",
      image: "/images/forage.png",
      issued: "forage",
      link: "https://drive.google.com/file/d/1LwglbaQ9tfJQZFKW67-rOMwpRzPsRSmE/view?usp=sharing",
    },
    {
      id: 16,
      name: "Introduction to Network Analysis",
      image: "/images/blueteam.png",
      issued: "blue team",
      link: "https://drive.google.com/file/d/1ZxeOxT9xvNNqOEn4sfLGfSTSdja6kfsO/view?usp=sharing",
    },
    {
      id: 17,
      name: "TLS/SSL Certificate",
      image: "/images/ssl-tls.png",
      issued: "Ed Harmoush",
      link: "https://drive.google.com/file/d/1-hpmHWpndrh-hNGFn8QaTQDC7me9yX3H/view?usp=sharing",
    },
    {
      id: 18,
      name: "DICT Basic Cloud Computing",
      image: "/images/DICT.png",
      issued: "DICT Philippines",
      link: "https://drive.google.com/file/d/1FC3cqIJqzWIEPod5cHG-L2o7akD2p-uc/view?usp=sharing",
    },
    {
      id: 19,
      name: "DICT Programming for Intermediate Users Using Python",
      image: "/images/DICT.png",
      issued: "DICT Philippines",
      link: "https://drive.google.com/file/d/1SBBrA8Hkcm6Et8AEG5bKX2FHExV98u1C/view?usp=sharin",
    },
    {
      id: 20,
      name: "DICT Programming For Beginners Using Python",
      image: "/images/DICT.png",
      issued: "DICT Philippines",
      link: "https://drive.google.com/file/d/1VpWv3xL8p6n1fR-SA1BSdffceO0R8POA/view?usp=sharing",
    },
  ];

  return (
    <motion.section
      id="certificate"
      className="w-full h-[50rem] flex flex-col md:flex-row items-center justify-center md:items-start md:justify-around mt-20 "
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-[15rem] md:ml-10">
        <Card>
          <CardHeader>
            <CardTitle>Certificates</CardTitle>
            <CardDescription className="text-center">
              These certificates reflect my strong dedication to continuous
              learning in web development and cybersecurity.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <div className="w-full md:w-[70%] h-[45rem] flex flex-col gap-5 overflow-y-auto mt-10 md:pl-20 ">
        {cert.map((certificate, index) => (
          <CertificateCard
            key={certificate.id}
            certificate={certificate}
            index={index}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
          />
        ))}
      </div>
    </motion.section>
  );
};

export default CertificateSection;
