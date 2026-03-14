"use client";

import { Sun, SunMoon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ModeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <div className="flex items-center justify-center mb-1">
      {resolvedTheme === "light" ? (
        <SunMoon
          onClick={() => {
            setTheme("dark");
          }}
          className="cursor-pointer font-medium  drop-shadow-[0_0_6px_rgba(0,0,0,0.6)] transition-all duration-300 w-[1.1rem] h-[1.1rem]"
        />
      ) : (
        <Sun
          onClick={() => {
            setTheme("light");
          }}
          className="cursor-pointer font-medium text-white  drop-shadow-[0_0_6px_rgba(255,255,255,0.8)] transition-all duration-300 w-[1.1rem] h-[1.1rem]"
        />
      )}
    </div>
  );
};

export default ModeToggle;
