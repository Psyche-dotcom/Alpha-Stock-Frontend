import type { Metadata } from "next";
import { Box } from "@chakra-ui/react";
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar/admin";
import { AdminSessionProvider } from "../context/admin-context";

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
      <AdminSessionProvider>
        <Box display="flex" gap="32px" height="100vh">
          <Sidebar />
          <Box flex="1" display="flex" flexDirection="column" height="100%">
            <Navbar />
            <Box flex="1" overflow="auto" className="pe-4 md:pe-6">
              {children}
            </Box>
          </Box>
        </Box>
      </AdminSessionProvider>
    </>
  );
}
