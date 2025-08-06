"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Logo = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div>
      {resolvedTheme === "light" ? (
        <Link href="#home">
          <Image
            src="/images/lightLogo.png"
            alt="LP logo"
            width={50}
            height={50}
          />
        </Link>
      ) : (
        <Link href="#home">
          <Image
            src="/images/darkLogo.png"
            alt="LP logo"
            width={50}
            height={50}
          />
        </Link>
      )}
    </div>
  );
};

export default Logo;
