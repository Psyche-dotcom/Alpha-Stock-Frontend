import GeneralLayout from "@/components/gene_layoutContext";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nvidia",
  description: "Home page",
};

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <GeneralLayout children={children} />
    </>
  );
}
