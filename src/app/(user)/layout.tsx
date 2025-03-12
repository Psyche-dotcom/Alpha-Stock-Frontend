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
          <>{children}</>
        </Box>
      </UserSessionProvider>
    </>
  );
}
