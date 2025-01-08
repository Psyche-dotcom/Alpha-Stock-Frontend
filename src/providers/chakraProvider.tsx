"use client";

import { chakraTheme } from "@/configs/chakraConfig";
import { ChakraProvider } from "@chakra-ui/react";

export function ChakraWrapperProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ChakraProvider theme={chakraTheme}>{children}</ChakraProvider>;
}
