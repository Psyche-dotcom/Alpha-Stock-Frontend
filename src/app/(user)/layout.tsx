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
    <>
      <UserSessionProvider>
        <Box>
          <UserNavbar />
          <Box className="px-4 md:px-6 lg:px-8 mt-6">{children}</Box>
          <RedirectContent />
          <Footer />
        </Box>
      </UserSessionProvider>
    </>
  );
}
