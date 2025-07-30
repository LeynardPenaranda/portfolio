import { FileUser } from "lucide-react";
import Link from "next/link";

const links = [
  { title: "Home", href: "#home" },
  { title: "Certificates", href: "#certificate" },
  { title: "Projects", href: "#projects" },
  { title: "Contact", href: "#contact" },
];

const Navbar = ({ flex = "flex-row" }: { flex: string }) => {
  return (
    <nav className={`flex items-center ${flex} justify-center gap-5`}>
      {links.map((link) => (
        <a key={link.href} href={link.href}>
          {link.title}
        </a>
      ))}
      <Link
        href="https://drive.google.com/file/d/1Nnj8nylzchgMUGZg9j-1Kic1jcasa_r3/view?usp=sharing"
        className="flex items-center"
      >
        <FileUser className="h-3 w-3" />
        Resume
      </Link>
    </nav>
  );
};

export default Navbar;
