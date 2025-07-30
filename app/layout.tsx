import type { Metadata } from "next";
// import { Roboto } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

// const roboto = Roboto({
//   subsets: ["latin"],
//   variable: "--font-roboto",
// });
export const metadata: Metadata = {
  title: { template: "%s | LP Portfolio", default: "LP Portfolio" },
  description: "Leynard Peñaranda Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={` ${poppins.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="w-full h-screen grid  grid-rows-[5rem_1fr_5rem]">
            <div className="fixed top-0 left-0 w-full z-50">
              <Header />
            </div>
            <main>{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
