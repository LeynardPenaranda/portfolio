"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ProfileImage = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [themeImage, setThemeImage] = useState("/images/lightprofile.png");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Trigger flip animation
    setFlipped(true);

    const timeout = setTimeout(() => {
      // After half flip duration, switch image
      setThemeImage(
        resolvedTheme === "light"
          ? "/images/lightprofile.png"
          : "/images/darkprofile.png",
      );
    }, 150); // half of 0.3s animation

    // After full flip, reset
    const resetTimeout = setTimeout(() => {
      setFlipped(false);
    }, 300);

    return () => {
      clearTimeout(timeout);
      clearTimeout(resetTimeout);
    };
  }, [resolvedTheme, mounted]);

  if (!mounted) return null;

  return (
    <div
      className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px] mx-auto"
      style={{ perspective: 1000 }}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.3 }}
        className="w-full h-full rounded-sm"
        style={{ transformStyle: "preserve-3d" }}
      >
        <Image
          src={themeImage}
          alt="leynard Penaranda"
          fill
          className="rounded-sm object-cover"
        />
      </motion.div>
    </div>
  );
};

export default ProfileImage;
