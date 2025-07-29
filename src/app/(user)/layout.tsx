import type { Metadata } from "next";
import { UserSessionProvider } from "../context/user-context";
import LayoutContent from "@/components/LayoutContent"; // Import the new client component

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
      {/* LayoutContent is now a separate client component */}
      <LayoutContent>{children}</LayoutContent>
    </UserSessionProvider>
  );
}
