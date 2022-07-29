import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Box } from "@chakra-ui/react";

interface ILayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: ILayoutProps) => {
  const { pathname } = useRouter();

  const pathsWithoutNavbar = ["/auth"];

  const renderNavbar = pathsWithoutNavbar.includes(pathname);

  return (
    <Box
      backgroundColor={"#0193f7"}
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
      >
        {children}
      </Box>

      {renderNavbar ? null : <Footer />}
    </Box>
  );
};

export default Layout;
