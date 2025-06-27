import { extendTheme } from "@chakra-ui/react";
import { Inter } from "@next/font/google";

export const colors = {
  brand: {
    primary:
      "linear-gradient(180deg,rgba(24,156,230,0.99) 33.91%, rgba(0,75,139,0.93) 92.46%)",
    secondary: "#62B8E6",
    tertiary: "#B6CE1B",
    gray: "#D8E1E8",
    dark: "#021729",
  },
  status: {
    error: "#F02B2B",
    success: "#01A91C",
    warning: "#EDD500",
  },
};

export const chakraTheme = extendTheme({
  colors,
  styles: {
    global: {
      "html, body": {
        fontSize: "16px",
        color: "gray.700",
        backgroundColor: "#EBE9E6",
      },

      body: {},
      shadows: {
        customLight: "0px 2px 4px -2px #0000000D",
        customDark: "0px 4px 6px -1px #0000001A",
      },
    },
  },

  config: {
    // initialColorMode: "dark",
    // useSystemColorMode: false,
  },
  components: {
    //   Switch: switchTheme,
    // Radio: radioTheme,
  },
});
