import type { Metadata } from "next";
import "./globals.css";
import { ChakraWrapperProvider } from "@/providers/chakraProvider";
import TopLoader from "@/components/top-loader";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
export const metadata: Metadata = {
  title: "Nvidia",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <TopLoader />
        <ChakraWrapperProvider>{children}</ChakraWrapperProvider>
      </body>
    </html>
  );
}
