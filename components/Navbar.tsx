import CustomButton from "@/components/basics/CustomButton";
import Logo from "@/public/favicon.ico";
import { Box, Text } from "@chakra-ui/react";
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

  const buttonsInfo: INavbarButtons[] = [
    { name: "Play", icon: "MazeIcon", path: "/play" },
    {
      name: "Pathfinding",
      icon: "/navbar/pathfinding-icon.png",
      path: "/pathfinding",
    },
    { name: "Algorithms", icon: "/navbar/algo-icon.png", path: "/learn" },
  ];

  return (
    <Box display="flex" justifyContent="center" alignItems="center" py="4">
      <NextLink href="/" passHref>
        <a className="logo flex basis-1/4 items-center gap-2 ml-8">
          <NextImage src={Logo} width={32} height={32} />
          <Text fontSize="2xl">Mazer</Text>
        </a>
      </NextLink>
      <div className="flex flex-auto flex-basis-1/2 justify-center buttons gap-8">
        {buttonsInfo.map((buttonInfo) => (
          <InvisibleButton key={buttonInfo.name} buttonInfo={buttonInfo} />
        ))}
      </div>
      <div
        className={`auth flex basis-1/4 gap-4 justify-end mr-8 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        {session ? (
          <>
            <CustomButton href={"/profile"}>Profile</CustomButton>
            <CustomButton onClick={() => signOut()}>Sign Out</CustomButton>
          </>
        ) : (
          <>
            <CustomButton href={"/auth"}>Login</CustomButton>
            {/* <CustomButton>Register</CustomButton> */}
          </>
        )}
      </div>
    </Box>
  );
};

export default Navbar;
