"use client";
import { motion } from "framer-motion";
import { Badge } from "./ui/badge";

type BadgeCarouselProps = {
  badges: string[]; // The array will hold badges for all 3 sections.
  direction: "left" | "right"; // Direction for scrolling: "left" or "right"
};

const BadgeCarousel = ({ badges, direction }: BadgeCarouselProps) => {
  // Split badges into three arrays
  const chunkedBadges = [
    badges.slice(0, Math.floor(badges.length / 3)),
    badges.slice(
      Math.floor(badges.length / 3),
      Math.floor((2 * badges.length) / 3),
    ),
    badges.slice(Math.floor((2 * badges.length) / 3), badges.length),
  ];

  // Duplicate the last chunk for seamless infinite scroll
  const duplicatedBadges = [...chunkedBadges, chunkedBadges[0]];

  // Calculate the initial X value based on direction
  const initialX = direction === "left" ? "0%" : "-100%";
  const animateX = direction === "left" ? "-100%" : "0%";

  return (
    <div className="relative w-full overflow-x-hidden">
      <motion.div
        className="flex"
        initial={{ x: initialX }}
        animate={{ x: animateX }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {/* Render three chunks of badges with an additional chunk for seamless scroll */}
        {duplicatedBadges.map((badgeArray, index) => (
          <div key={index} className="flex-shrink-0 flex gap-4 ml-5">
            {badgeArray.map((badge) => (
              <div key={badge} className="flex-shrink-0">
                <Badge
                  variant="secondary"
                  className="whitespace-nowrap border border-gray-300 py-1 px-3"
                >
                  {badge}
                </Badge>
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default BadgeCarousel;
