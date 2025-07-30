import CertificateSection from "@/components/certificates-components/certificate-section";
import ContactSection from "@/components/contact-components/contact-section";
import HomeComponent from "@/components/home-components/home-section";
import ProjectSection from "@/components/projects-components.tsx/projects-section";

export default function Home() {
  return (
    <>
      <HomeComponent />
      <CertificateSection />
      <ProjectSection />
      <ContactSection />
    </>
  );
}
