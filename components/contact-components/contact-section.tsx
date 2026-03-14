"use client";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";

const ContactSection = () => {
  return (
    <section
      id="contact"
      className="w-full flex flex-col items-center justify-center py-20 bg-background"
    >
      <div className="w-[90%] md:w-[80%] lg:w-[60%] mb-20">
        <div className="text-center mb-12">
          <h1 className="font-bold text-5xl text-black">CONTACT</h1>
          <p className="font-semibold text-muted-foreground text-xl">
            Get in Touch
          </p>
        </div>
        <div className="w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          <Card className="w-full flex flex-row items-center justify-start drop-shadow-md rounded-lg p-4">
            <div className="w-[60px] h-[60px] flex items-center justify-center ml-2 rounded-full border border-gray-300 shadow-md dark:shadow-white">
              <MapPin />
            </div>
            <CardHeader className="w-full ml-4">
              <CardTitle className="text-lg font-semibold">Location</CardTitle>
              <CardDescription>
                <Link
                  href="https://www.google.com/maps/@11.7907012,124.8652568,16z?authuser=0&entry=ttu&g_ep=EgoyMDI1MDcyNy4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:underline"
                >
                  Catbalogan City, Samar, Philippines
                </Link>
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="w-full flex flex-row items-center justify-start drop-shadow-md rounded-lg p-4">
            <div className="w-[60px] h-[60px] flex items-center justify-center ml-2 rounded-full border border-gray-300 shadow-md dark:shadow-white">
              <Mail />
            </div>
            <CardHeader className="w-full ml-4">
              <CardTitle className="text-lg font-semibold">Email</CardTitle>
              <CardDescription className="break-all text-muted-foreground">
                penarandaleynard@gmail.com
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="w-full flex flex-row items-center justify-start drop-shadow-md rounded-lg p-4">
            <div className="w-[60px] h-[60px] flex items-center justify-center ml-2 rounded-full border border-gray-300 shadow-md dark:shadow-white">
              <Linkedin />
            </div>
            <CardHeader className="w-full ml-4">
              <CardTitle className="text-lg font-semibold">LinkedIn</CardTitle>
              <CardDescription>
                <Link
                  href="https://www.linkedin.com/in/leynard-penaranda-40ab95337/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:underline"
                >
                  Leynard Penaranda
                </Link>
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="w-full flex flex-row items-center justify-start drop-shadow-md rounded-lg p-4">
            <div className="w-[60px] h-[60px] flex items-center justify-center ml-2 rounded-full border border-gray-300 shadow-md dark:shadow-white">
              <Github />
            </div>
            <CardHeader className="w-full ml-4">
              <CardTitle className="text-lg font-semibold">GitHub</CardTitle>
              <CardDescription>
                <Link
                  href="https://github.com/LeynardPenaranda"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:underline"
                >
                  Leynard Penaranda
                </Link>
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
