"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
          : "/images/darkprofile.png"
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
    <div className="w-fit mx-auto" style={{ perspective: 1000 }}>
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.3 }}
        className="rounded-sm"
        style={{ transformStyle: "preserve-3d" }}
      >
        <Image
          src={themeImage}
          alt="leynard Penaranda"
          width={450}
          height={450}
          className="rounded-sm"
        />
      </motion.div>
    </div>
  );
};

export default ProfileImage;
