import type { Metadata } from "next";
import { Box } from "@chakra-ui/react";
import UserNavbar from "@/components/navbar/user";

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
      <Box overflow={"scroll"}>
        <UserNavbar />
        <>{children}</>
      </Box>
    </>
  );
}
