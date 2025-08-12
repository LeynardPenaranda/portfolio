import Image from "next/image";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import Link from "next/link";
import { Code, Radio } from "lucide-react";
import { motion } from "framer-motion";

const projectsArray = [
  {
    id: 1,
    name: "Fast Fizza Factory",
    status: "active",
    image: "/images/pizza.png",
    link: "https://leynardpenaranda-fast-react-pizza.netlify.app/",
    codeLink: "https://github.com/LeynardPenaranda/fast-react-pizza",
    description:
      "A modern pizza ordering app with cart management and dynamic menu features built using React and state management tools.",
    badges: [
      "React",
      "JavaScript",
      "CSS Modules",
      "Redux",
      "Rest API",
      "React Router",
    ],
  },
  {
    id: 2,
    name: "The Wild Oasis Employee",
    status: "active",
    image: "/images/wildOasis.png",
    link: "https://leynardpenaranda-the-wild-oasis.netlify.app/login",
    codeLink: "https://github.com/LeynardPenaranda/the-wild-oasis",
    description:
      "A full-featured hotel admin dashboard for managing bookings, guests, and cabins — secured with login and role-based access. Message me to get the credentials.",
    badges: [
      "React",
      "Supabase",
      "Styled Components",
      "Rest API",
      "Authentication",
    ],
  },
  {
    id: 3,
    name: "The Wild Oasis Website Guest",
    status: "active",
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
  },
  {
    id: 4,
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
  },
  {
    id: 5,
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
      "Redux",
      "Tailwind CSS",
      "Static Site",
      "React Router",
      "Rest API",
    ],
  },
];

const ProjectCard = () => {
  return (
    <div className="flex items-center justify-center flex-col sm:grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 md:w-[80%] mx-auto gap-5 mb-10">
      {projectsArray.map((project) => (
        <motion.div
          key={project.id}
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)",
          }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-zinc-800 rounded-xl cursor-pointer w-[90%] md:w-[100%]"
        >
          <Card className="w-full h-full drop-shadow-[0_0_4px_white] overflow-hidden">
            <CardHeader className="space-y-3">
              <div className="border border-gray-300 flex items-center justify-center overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.name}
                  width={400}
                  height={400}
                  className="w-full h-auto object-contain max-h-60"
                />
              </div>

              <Badge variant="success" className="whitespace-nowrap">
                {project.status}
              </Badge>

              <CardTitle className="break-words">{project.name}</CardTitle>

              <CardDescription className="break-words">
                {project.description}
              </CardDescription>

              <div className="flex flex-wrap gap-2">
                {project.badges.map((badge) => (
                  <Badge
                    key={badge}
                    variant="secondary"
                    className="whitespace-nowrap border border-gray-300"
                  >
                    {badge}
                  </Badge>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 items-center justify-center">
                <Button asChild className="rounded-none flex-1 min-w-[120px]">
                  <Link
                    href={project.codeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Code /> Code
                  </Link>
                </Button>
                <Button asChild className="flex-1 min-w-[150px]">
                  <Link
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Radio /> Visit Live Project
                  </Link>
                </Button>
              </div>
            </CardHeader>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default ProjectCard;
