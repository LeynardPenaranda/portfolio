import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";

const ContactSection = () => {
  return (
    <section
      id="contact"
      className="w-full h-[50rem] mt-50  flex items-center justify-center pb-20"
    >
      <div className=" w-[90%] h-[90%] flex flex-col items-start">
        <div className="">
          <h1 className="font-bold text-5xl">CONTACT</h1>
          <p className="font-bold text-muted-foreground">Get in Touch</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-20 w-full">
          <Card className="w-full sm:w-[20rem] flex flex-row items-center justify-start">
            <div className="w-[6rem] h-[4rem] flex items-center justify-center ml-2 rounded-full border border-gray-300 shadow-md dark:shadow-white">
              <MapPin />
            </div>

            <CardHeader className="w-full">
              <CardTitle>Location</CardTitle>
              <CardDescription>
                <Link href="https://www.google.com/maps/@11.7907012,124.8652568,16z?authuser=0&entry=ttu&g_ep=EgoyMDI1MDcyNy4wIKXMDSoASAFQAw%3D%3D">
                  Catbalogan City, Samar, Philippines
                </Link>
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="w-full sm:w-[20rem] flex flex-row items-center justify-start">
            <div className="w-[6rem] h-[4rem] flex items-center justify-center ml-2 rounded-full border border-gray-300 shadow-md dark:shadow-white">
              <Mail />
            </div>

            <CardHeader className="w-full">
              <CardTitle>Email</CardTitle>
              <CardDescription>leynardlove@gmail.com</CardDescription>
            </CardHeader>
          </Card>
          <Card className="w-full sm:w-[20rem] flex flex-row items-center justify-start">
            <div className="w-[6rem] h-[4rem] flex items-center justify-center ml-2 rounded-full border border-gray-300 shadow-md dark:shadow-white">
              <Linkedin />
            </div>

            <CardHeader className="w-full">
              <CardTitle>LinkedIn</CardTitle>
              <CardDescription>
                <Link href="https://www.linkedin.com/in/leynard-pe%C3%B1aranda-40ab95337/">
                  Leynard Penaranda
                </Link>
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="w-full sm:w-[20rem] flex flex-row items-center justify-start">
            <div className="w-[6rem] h-[4rem] flex items-center justify-center ml-2 rounded-full border border-gray-300 shadow-md dark:shadow-white">
              <Github />
            </div>

            <CardHeader className="w-full">
              <CardTitle>GitHub</CardTitle>
              <CardDescription>
                <Link href="https://github.com/LeynardPenaranda">
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
