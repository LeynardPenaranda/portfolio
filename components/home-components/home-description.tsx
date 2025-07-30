"use client";
import { motion } from "framer-motion";

const DescriptionProfile = () => {
  return (
    <h1 className=" font-bold text-4xl text-center px-2">
      Junior Front-End React Developer{" "}
      <motion.span
        animate={{ rotate: [0, 20, -10, 20, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatDelay: 1,
          ease: "easeInOut",
        }}
        className="inline-block origin-bottom-left"
      >
        👋
      </motion.span>
    </h1>
  );
};

export default DescriptionProfile;
