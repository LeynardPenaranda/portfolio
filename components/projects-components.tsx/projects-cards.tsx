"use client";
import { useState } from "react";
import Image from "next/image";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import Link from "next/link";
import { AlertCircle, Code, Download, Lock, Radio, X } from "lucide-react";
import { motion } from "framer-motion";
import BadgeCarousel from "../BadgeCarousel";

type Project = {
  id: number;
  name: string;
  status: "active" | "inactive";
  image: string;
  link: string;
  codeLink: string;
  description: string;
  badges: string[];
  featured: boolean;
  isPrivateRepo?: boolean;
  installLink?: string;
};

const projectsArray = [
  {
    id: 103,
    name: "KalikaScan",
    status: "active",
    image: "/images/kalikascan-logo.png",
    link: "",
    codeLink: "https://github.com/LeynardPenaranda/kalikascan",
    description:
      "KalikaScan is a mobile app focused on plant scanning and identification. It uses Plant.id by Kindwise for recognition, Firebase for backend services, Cloudinary for media handling, and a React Native + TypeScript stack for the app experience. At the moment, the mobile app is only compatible with Android because iOS testing is limited by the lack of physical resources.",
    badges: [
      "React Native",
      "Firebase",
      "Plant.id by Kindwise",
      "Cloudinary",
      "TypeScript",
    ],
    featured: true,
    isPrivateRepo: true,
    installLink:
      "https://drive.google.com/file/d/1uadSYDrOalyl3ggVVieSEzY6p98xXDzZ/view?usp=sharing",
  },
  {
    id: 102,
    name: "Data Warehouse and Analytics Project",
    status: "active",
    image: "/images/data-warehouse-sql.png",
    link: "",
    codeLink: "https://github.com/LeynardPenaranda/sql-datawarehouse-project",
    description:
      "Welcome to the Data Warehouse and Analytics Project repository! This project demonstrates a complete data warehousing and analytics solution. From building a data warehouse to generating actionable insights, it covers essential concepts in Data Engineering and Analytics using SQL Server.",
    badges: [
      "SQL Server",
      "Data Engineering",
      "Data Analytics",
      "ETL",
      "Business Intelligence",
    ],
    featured: true,
  },
  {
    id: 101,
    name: "Confluent Kafka Hands On",
    status: "active",
    image: "/images/confluent-kafka.png",
    link: "",
    codeLink: "https://github.com/LeynardPenaranda/confluent-kafka-hands-on",
    description:
      "Welcome to the Confluent Kafka Hands-On repository! This project offers a comprehensive guide on working with Confluent Kafka, focusing on the integration with Python to perform tasks like topic creation, producer configuration, and sending messages into Kafka topics. You’ll gain hands-on experience in setting up Kafka clusters, creating topics in Confluent Cloud, and working with Kafka messages using Python and the `confluent-kafka` library.\n\nIn this project, you'll learn the following:\n\n📌 How to create and manage topics in Confluent Cloud\n🔑 Setting up a Kafka client and obtaining connection credentials\n🧾 Preparing and converting source data (CSV to JSON)\n🧑‍💻 Initializing a Kafka producer and sending messages\n📤 Understanding the message flow from local data to Confluent Cloud\n🔄 Sending test messages manually before automating the process\n\nAdditionally, I cover critical concepts like connecting external applications to Confluent Cloud, ensuring secure API key handling, and sending messages in the correct format. By following this hands-on project, you'll get practical experience with Confluent Kafka, which is crucial for building real-time streaming data pipelines in a cloud environment.",
    badges: ["Confluent", "Google Colab", "Python", "Apache kafka"],
    featured: true,
  },
  {
    id: 100,
    name: "Big Data Hive Practical",
    status: "active",
    image: "/images/hive-project.png",
    link: "",
    codeLink: "https://github.com/LeynardPenaranda/big-data-hive-practical",
    description:
      "Welcome to the Big Data Hive Practical repository! In this project, I demonstrate how to use Apache Hive for big data analysis and querying within a cloud environment, specifically utilizing GCP Dataproc. You will learn to set up Hive, open the Hive Command Line Interface (CLI) in Dataproc, and perform tasks such as creating databases and tables. Additionally, I guide you through connecting to Hive using Beeline CLI via JDBC, running queries, and performing CRUD operations.\n\nThis project also covers key Hive concepts such as managing data in the Hive Metastore (using MySQL), performing CRUD operations, and understanding the application type for Hive environments. By working through this practical project, you will gain hands-on experience in using Hive for large-scale data analysis, offering a valuable skill set for data engineers and analysts working with big data technologies like Hadoop and GCP Dataproc.",
    badges: ["GCP Dataproc", "Hadoop HDFS", "Olist Dataset", "Apache Hive"],
    featured: true,
  },
  {
    id: 1,
    name: "Big Data Engineering Real-World Project: E-commerce Dataset",
    status: "active",
    image: "/images/big-data-engineering.png",
    link: "",
    codeLink:
      "https://github.com/LeynardPenaranda/Big-Data-Engineering-Real-World-Project-Ecommerce-Dataset",
    description:
      "Welcome to my Data Engineering portfolio project, where I work with the Brazilian E-Commerce Public Dataset by Olist. This project provides a detailed, step-by-step data engineering workflow, covering the entire process from raw data understanding to distributed ingestion, transformation, optimization, and data serving. Through this project, I demonstrate practical skills in: Data Understanding, Data Ingestion & Exploration, Data Cleaning & Transformation, Data Integration & Aggregation, Process Optimization, and Data Serving.",
    badges: [
      "GCP Dataproc",
      "Apache Spark",
      "Hadoop HDFS",
      "Python",
      "Jupyter Notebook",
      "Olist Dataset",
      "Apache Hive",
    ],
    featured: true,
  },
  {
    id: 2,
    name: "Fast Fizza Factory",
    status: "active",
    image: "/images/pizza.png",
    link: "https://leynardpenaranda-fast-react-pizza.netlify.app/",
    codeLink: "https://github.com/LeynardPenaranda/fast-react-pizza",
    description:
      "A modern pizza ordering app with cart management and dynamic menu features built using React and state management tools.",
    badges: [
      "React",
      "Vite",
      "JavaScript",
      "Tailwind CSS",
      "Redux",
      "Rest API",
      "React Router",
    ],
    featured: false,
  },
  {
    id: 3,
    name: "The Wild Oasis Employee",
    status: "inactive",
    image: "/images/wildOasis.png",
    link: "https://leynardpenaranda-the-wild-oasis.netlify.app/login",
    codeLink: "https://github.com/LeynardPenaranda/the-wild-oasis",
    description:
      "A full-featured hotel admin dashboard for managing bookings, guests, and cabins secured with login and role-based access. Message me to get the credentials.",
    badges: [
      "React",
      "Supabase",
      "Styled Components",
      "Rest API",
      "Authentication",
    ],
    featured: false,
  },
  {
    id: 4,
    name: "The Wild Oasis Website Guest",
    status: "inactive",
    image: "/images/cabin-website.png",
    link: "https://the-wild-oasis-website-leynardpenar.vercel.app/",
    codeLink: "https://github.com/LeynardPenaranda/the-wild-oasis-website",
    description:
      "A guest-facing hotel website showcasing available cabins and amenities, designed with responsive UI and smooth user experience.",
    badges: [
      "Next.js",
      "Tailwind CSS",
      "Supabase",
      "Rest API",
      "Responsive Design",
    ],
    featured: false,
  },
  {
    id: 5,
    name: "The ShopeStore an E-commerce website",
    status: "active",
    image: "/images/shopestore3.png",
    link: "https://shope-store-kqpx.vercel.app/",
    codeLink: "https://github.com/LeynardPenaranda/shope-store",
    description:
      "A sleek and responsive e-commerce platform built with Next.js, featuring product browsing, cart system, and clean UI.",
    badges: [
      "Next.js",
      "Tailwind CSS",
      "TypeScript",
      "Rest API",
      "Prisma",
      "Authentication",
    ],
    featured: true,
  },
  {
    id: 6,
    name: "Static E-commerce website",
    status: "active",
    image: "/images/staticEcommerce.png",
    link: "https://e-commerce-with-redux-rest-api.vercel.app/",
    codeLink:
      "https://github.com/LeynardPenaranda/e-commerce-with-redux-rest-api",
    description:
      "A static, demo-only e-commerce site built with React — showcasing modern product listings, a functional cart interface, and smooth navigation. Checkout is non-functional and for display purposes only.",
    badges: [
      "React",
      "Vite",
      "TypeScript",
      "Redux",
      "Tailwind CSS",
      "Static Site",
      "React Router",
      "Rest API",
    ],
    featured: false,
  },
  {
    id: 7,
    name: "Digital Lost and Found System",
    status: "active",
    image: "/images/digital-lost-found.png",
    link: "https://digital-lost-and-found-system.vercel.app/sign-in",
    codeLink:
      "https://github.com/LeynardPenaranda/digital-lost-and-found-system",
    description:
      "The Digital Lost and Found System is a real-time platform designed for SSU, allowing users to post and report lost items. With socket.io integration, users can message each other in real time for faster resolution. Please note that Firebase storage is currently disabled in this system.",
    badges: [
      "React",
      "Nextjs",
      "TypeScript",
      "Redux",
      "Tailwind CSS",
      "Socket.io",
      "Rest API",
      "Firebase Storage",
      "MongoDB",
    ],
    featured: true,
  },
 ] satisfies Project[];

const ProjectCard = () => {
  const [privateRepoProject, setPrivateRepoProject] = useState<Project | null>(
    null
  );

  return (
    <>
      <div className="flex items-center justify-center flex-col sm:grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 md:w-[80%] mx-auto gap-3 mb-10">
        {projectsArray.map((project) => (
          <motion.div
            key={project.id}
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)",
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className={`bg-white dark:bg-zinc-800 rounded-xl cursor-pointer w-[90%] sm:w-[350px] md:w-[380px] lg:w-[350px] xl:w-[350px] h-[620px] overflow-hidden relative ${
              project.featured
                ? "border-4 border-teal-500 shadow-lg shadow-teal-500"
                : ""
            }`}
          >
            <Card className="w-full h-full drop-shadow-[0_0_4px_white] overflow-hidden flex flex-col">
              <CardHeader className="space-y-3 flex-grow">
                {project.featured && (
                  <div className="absolute top-0 right-20 w-[50%] p-1 bg-teal-500 text-white text-center text-sm font-semibold rounded-b-xl">
                    Featured Project
                  </div>
                )}
                <div className="border border-gray-300 flex items-center justify-center overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.name}
                    width={400}
                    height={300}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <CardTitle className="break-words">{project.name}</CardTitle>
                  {project.name === "KalikaScan" && (
                    <p className="text-sm font-medium text-emerald-600">
                      Android only
                    </p>
                  )}
                </div>

                <Badge
                  variant={
                    project.status === "active" ? "success" : "destructive"
                  }
                  className="whitespace-nowrap"
                >
                  {project.status}
                </Badge>

                {project.status === "inactive" && (
                  <div className="flex text-yellow-500 gap-2">
                    <AlertCircle size={20} />
                    <CardDescription className="break-words text-yellow-500/50">
                      This project is currently inactive due to Supabase pausing
                      the project.
                    </CardDescription>
                  </div>
                )}

                <CardDescription
                  className="break-words overflow-y-auto max-h-[120px] scrollbar-hide text-[13px]"
                  style={{ WebkitOverflowScrolling: "touch" }}
                >
                  {project.description}
                </CardDescription>

                <BadgeCarousel badges={project.badges} direction="left" />
                <BadgeCarousel badges={project.badges} direction="right" />
              </CardHeader>

              <div className="flex flex-wrap gap-1 items-center justify-center mt-auto px-2">
                {project.isPrivateRepo ? (
                  <Button
                    type="button"
                    className="flex-1 min-w-[120px]"
                    onClick={() => setPrivateRepoProject(project)}
                  >
                    <Lock /> Code Locked
                  </Button>
                ) : (
                  <Button asChild className="flex-1 min-w-[120px]">
                    <Link
                      href={project.codeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Code /> Code
                    </Link>
                  </Button>
                )}

                {project.installLink && (
                  <Button asChild className="flex-1 min-w-[140px]">
                    <Link
                      href={project.installLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Download /> Install App
                    </Link>
                  </Button>
                )}

                {project.link && (
                  <Button asChild className="flex-1 min-w-[150px]">
                    <Link
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Radio /> Visit Live Project
                    </Link>
                  </Button>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {privateRepoProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-md rounded-2xl border bg-background p-6 shadow-2xl">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold">Private Repository</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  The GitHub repository for {privateRepoProject.name} is not
                  public right now, so the source code can&apos;t be viewed.
                </p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setPrivateRepoProject(null)}
                aria-label="Close private repository modal"
              >
                <X />
              </Button>
            </div>

            <div className="flex flex-wrap justify-end gap-2">
              {privateRepoProject.installLink && (
                <Button asChild variant="outline">
                  <Link
                    href={privateRepoProject.installLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download /> Install App
                  </Link>
                </Button>
              )}
              <Button
                type="button"
                onClick={() => setPrivateRepoProject(null)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectCard;
