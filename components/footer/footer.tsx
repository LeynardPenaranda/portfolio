import { FileUser } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="fixed bottom-0 left-0 bg-background w-full h-[5rem]  border-t border-gray-300 flex items-center justify-around">
      <span className="px-2">
        {" "}
        ©Leynard M Peñaranda - {currentYear} All rights reserved.
      </span>
      <Link
        href="https://drive.google.com/file/d/1Nnj8nylzchgMUGZg9j-1Kic1jcasa_r3/view?usp=sharing"
        className="flex items-center"
      >
        <FileUser className="h-10 w-10" />
      </Link>
    </div>
  );
};

export default Footer;
