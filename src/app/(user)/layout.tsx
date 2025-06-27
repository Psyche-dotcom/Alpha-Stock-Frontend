import type { Metadata } from "next";
import { Box } from "@chakra-ui/react";
import UserNavbar from "@/components/navbar/user";
import { UserSessionProvider } from "../context/user-context";
import RedirectContent from "@/components/redirect-modal";
import Footer from "@/parts/user/user_main_footer";

export const metadata: Metadata = {
  title: "Nvidia",
  description: "User page",
};

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserSessionProvider>
      <Box className="relative min-h-screen overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-50"
        >
          <source src="/assets/wave-bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Foreground Content */}
        <Box className="relative z-10">
          <UserNavbar />
          <Box className="px-4 md:px-6 lg:px-8 mt-6">{children}</Box>
          <RedirectContent />
          <Footer />
        </Box>
      </Box>
    </UserSessionProvider>
  );
}
