import Image from "next/image";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import Link from "next/link";
import { Radio } from "lucide-react";
import { motion } from "framer-motion";
const projectsArray = [
  {
    id: 1,
    name: "Fast Fizza Factory",
    status: "active",
    image: "/images/pizza.png",
    link: "https://leynardpenaranda-fast-react-pizza.netlify.app/",
    description:
      "A modern pizza ordering app with cart management and dynamic menu features built using React and state management tools.",
  },
  {
    id: 2,
    name: "The Wild Oasis Employee",
    status: "active",
    image: "/images/wildOasis.png",
    link: "https://leynardpenaranda-the-wild-oasis.netlify.app/login",
    description:
      "A full-featured hotel admin dashboard for managing bookings, guests, and cabins — secured with login and role-based access.",
  },
  {
    id: 3,
    name: "The Wild Oasis Website Guest",
    status: "active",
    image: "/images/cabin-website.png",
    link: "https://the-wild-oasis-website-leynardpenar.vercel.app/",
    description:
      "A guest-facing hotel website showcasing available cabins and amenities, designed with responsive UI and smooth user experience.",
  },
  {
    id: 4,
    name: "The ShopeStore an E-commerce website",
    status: "active",
    image: "/images/shopestore3.png",
    link: "https://shope-store-kqpx.vercel.app/",
    description:
      "A sleek and responsive e-commerce platform built with Next.js, featuring product browsing, cart system, and clean UI.",
  },
];

const ProjectCard = () => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 md:w-[80%] mx-auto gap-5 mb-10 ">
      {projectsArray.map((project) => (
        <motion.div
          key={project.id}
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)",
          }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 300 }}
          className=" bg-white dark:bg-zinc-800 rounded-xl  cursor-pointer "
        >
          <Card className="md:w-[100%]] h-full">
            <CardHeader>
              <div className="border border-gray-300 flex items-center justify-center">
                <Image
                  src={project.image}
                  alt={project.name}
                  width={400}
                  height={400}
                />
              </div>
              <Badge variant="success">{project.status}</Badge>
              <CardTitle>{project.name}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
              <Button asChild>
                <Link href={project.link}>
                  <Radio /> Visit Live Project
                </Link>
              </Button>
            </CardHeader>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default ProjectCard;
