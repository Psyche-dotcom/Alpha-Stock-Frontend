"use client";

import { chakraTheme } from "@/configs/chakraConfig";
import { ChakraProvider } from "@chakra-ui/react";
import QueryProvider from "./tanstackProvider";

export function ChakraWrapperProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ChakraProvider theme={chakraTheme}>
      <QueryProvider>{children}</QueryProvider>
    </ChakraProvider>
  );
}
