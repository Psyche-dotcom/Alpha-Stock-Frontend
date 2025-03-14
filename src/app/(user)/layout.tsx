import type { Metadata } from "next";
import { Box } from "@chakra-ui/react";
import UserNavbar from "@/components/navbar/user";
import { UserSessionProvider } from "../context/user-context";

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
          <Box className="px-4 md:px-6 lg:px-8">{children}</Box>
        </Box>
      </UserSessionProvider>
    </>
  );
}
