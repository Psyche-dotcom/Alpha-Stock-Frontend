import type { Metadata } from "next";
import "./globals.css";
import { ChakraWrapperProvider } from "@/providers/chakraProvider";
import TopLoader from "@/components/top-loader";
import { Inter } from "@next/font/google";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
export const metadata: Metadata = {
  title: "Nvidia",
  description: "Welcome to your stock analysis page",
  icons: {
    icon: {
      url: "/favicon.ico",
      type: "image/png",
      sizes: "32x32",
    },
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
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
        <Toaster richColors expand={false} />
        <ChakraWrapperProvider>{children}</ChakraWrapperProvider>
      </body>
    </html>
  );
}
