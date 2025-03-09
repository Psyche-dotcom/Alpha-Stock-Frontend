import type { Metadata } from "next";
import { Box } from "@chakra-ui/react";
import UserNavbar from "@/components/navbar/user";
import { UserSessionProvider } from "../context/user-context";

export const metadata: Metadata = {
  title: "Nvidia",
  description: "Uer page",
};

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <UserSessionProvider>
        <Box overflow={"scroll"}>
          <UserNavbar />
          <>{children}</>
        </Box>
      </UserSessionProvider>
    </>
  );
}
