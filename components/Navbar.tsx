import CustomButton from "@/components/basics/CustomButton";
import Logo from "@/public/favicon.ico";
import { Box } from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import NextImage from "next/image";
import NextLink from "next/link";
import InvisibleButton from "./basics/InvisibleButton";

interface INavbarButtons {
  name: string;
  icon: string;
  path: string;
}

const Navbar = () => {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  const buttons: INavbarButtons[] = [
    { name: "Play", icon: "MazeIcon", path: "/play" },
    {
      name: "PathFinding",
      icon: "",
      path: "/pathfinding",
    },
    { name: "Algorithms", icon: "/navbar/algo-icon.png", path: "/learn" },
  ];

  return (
    <Box display="flex" justifyContent="center" alignItems="center" py="4">
      <NextLink href="/" passHref>
        <a className="logo flex basis-1/4 items-center gap-2 ml-8">
          <NextImage src={Logo} width={32} height={32} />
          <span className="text-center text-2xl">Mazer</span>
          {/* change the font to 'gino nord' */}
        </a>
      </NextLink>
      <div className="flex flex-auto flex-basis-1/2 justify-center buttons gap-8">
        {buttons.map((button) => (
          <NextLink key={button.name} href={button.path} passHref>
            <InvisibleButton icon={button.icon} text={button.name} />
          </NextLink>
        ))}
      </div>
      <div
        className={`auth flex basis-1/4 gap-4 justify-end mr-8 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        {session ? (
          <>
            <NextLink href="/profile" passHref>
              <CustomButton>Profile</CustomButton>
            </NextLink>
            <CustomButton onClick={() => signOut()}>Sign Out</CustomButton>
          </>
        ) : (
          <>
            <NextLink href="/auth" passHref>
              <CustomButton>Login</CustomButton>
            </NextLink>
            {/* <NextLink href="/auth" passHref>
              <CustomButton>Register</CustomButton>
            </NextLink> */}
          </>
        )}
      </div>
    </Box>
  );
};

export default Navbar;
