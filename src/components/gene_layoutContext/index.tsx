"use client";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Box } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";

const GeneralLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <SessionProvider>
      <header className="sticky top-0 z-10 shadow-lg">
        <Navbar />
      </header>
      <Box className="px-4 md:px-6 lg:px-8 max-w-[1440px] mx-auto">
        {children}
      </Box>
      <Footer />
    </SessionProvider>
  );
};

export default GeneralLayout;
