import { useRouter } from "next/router";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface ILayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: ILayoutProps) => {
  const { pathname } = useRouter();

  return (
    <div className="app flex flex-col w-full min-h-screen bg-bg-blue">
      {pathname === "/auth" ? null : <Navbar />}
      <main className="flex flex-col grow justify-center items-center">
        {children}
      </main>

      {pathname === "/auth" ? null : <Footer />}
    </div>
  );
};

export default Layout;
