import type { Metadata } from "next";
import { Box } from "@chakra-ui/react";
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar/admin";

export const metadata: Metadata = {
  title: "Nvidia",
  description: "Admin page",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Box display="flex" gap="32px" height="100vh">
        <Sidebar />
        <Box flex="1" display="flex" flexDirection="column" height="100%">
          <Navbar />
          <Box flex="1" overflow="auto">
            {children}
          </Box>
        </Box>
      </Box>
    </>
  );
}
