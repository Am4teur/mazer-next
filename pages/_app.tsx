import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import Layout from "../components/Layout";

const colors = {
  brand: {
    "gray-light": "#36393f",
    "gray-md": "#2f3136",
    "gray-dark": "#202225",
    "gray-whiteish": "#b9bbbe",
    "blue-1": "#218ed8",
    "blue-2": "#28a0f0",
    "blue-3": "#008ff0",
    "bg-blue": "#D1EDFF",
  },
};

const theme = extendTheme({
  colors,
  fonts: {
    heading:
      "Rubik, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
    body: "Rubik, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
