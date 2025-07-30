"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

const ProfileImage = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div>
      {resolvedTheme === "light" ? (
        <Image
          src="/images/lightprofile.png"
          alt="leynard Penaranda"
          width={450}
          height={450}
          className="rounded-sm"
        />
      ) : (
        <Image
          src="/images/darkprofile.png"
          alt="leynard Penaranda"
          width={450}
          height={450}
          className="rounded-sm"
        />
      )}
    </div>
  );
};

export default ProfileImage;
