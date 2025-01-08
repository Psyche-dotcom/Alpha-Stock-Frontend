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
      <Box display="flex" gap={"32px"}>
        <Sidebar />
        <Box flex="1">
          <Navbar />
          <>{children}</>
        </Box>
      </Box>
    </>
  );
}
