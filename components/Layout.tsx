import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";

interface ILayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: ILayoutProps) => {
  const { pathname } = useRouter();

  const pathsWithoutNavbar = ["/auth"];

  const renderNavbar = pathsWithoutNavbar.includes(pathname);

  return (
    <Box
      // bgGradient={"linear(106.34deg,#0052ff 40%,#2ccefe 100%)"}
      bgGradient={"linear(106deg,#0052ff,#090422 150.05%)"}
      display="flex"
      flexDirection="column"
      minH="100vh"
    >
      {renderNavbar ? null : <Navbar />}
      <Box
        as="main"
        display="flex"
        flexDirection="column"
        flexGrow={1}
        justifyContent="center"
        alignItems="center"
        my="4"
        mx="32"
      >
        {children}
      </Box>

      {renderNavbar ? null : <Footer />}
    </Box>
  );
};

export default Layout;
