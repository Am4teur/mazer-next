import { extendTheme } from "@chakra-ui/react";
import "@fontsource/rubik";

const theme = extendTheme({
  fonts: {
    heading:
      "Rubik, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
    body: "Rubik, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
  },
  colors: {
    brand: {
      // from tailwind
      "gray-light": "#36393f",
      "gray-md": "#2f3136",
      "gray-dark": "#202225",
      "gray-whiteish": "#b9bbbe",
      "blue-1": "#218ed8",
      "blue-2": "#28a0f0",
      "blue-3": "#008ff0",
      // hover is the brand.blue-3 from 47% to 70%
      // https://www.w3schools.com/colors/colors_converter.asp
      "blue-3-hover": "hsl(204, 100%, 70%)",
      "bg-blue": "#D1EDFF",
      "blue-4": "#105093",
      "blue-5": "#166cc6",
      "blue-6": "#0a3460",
    },
  },
});

export default theme;
