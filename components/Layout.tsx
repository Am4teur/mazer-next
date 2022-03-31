import Navbar from "./Navbar";
import Footer from "./Footer";

interface ILayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: ILayoutProps) => {
  return (
    <div className="app flex flex-col w-full min-h-screen bg-bg-blue">
      <Navbar />
      <main className="flex flex-col grow justify-center items-center">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
