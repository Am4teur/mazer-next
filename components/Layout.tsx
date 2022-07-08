import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface ILayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: ILayoutProps) => {
  const { pathname } = useRouter();

  const pathsWithoutNavbar = ["/auth"];

  const renderNavbar = pathsWithoutNavbar.includes(pathname);

  return (
    <div className="app flex flex-col w-full min-h-screen bg-bg-blue">
      {renderNavbar ? null : <Navbar />}
      <main className="flex flex-col grow justify-center items-center">
        {children}
      </main>

      {renderNavbar ? null : <Footer />}
    </div>
  );
};

export default Layout;
