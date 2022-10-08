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
    // Generating / Generation isntead of Algorithms
  ];

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      py="4"
      px="32"
    >
      <Box display="flex" flexBasis={"25%"}>
        <NextLink href="/" passHref>
          <a>
            <Box display="flex" alignItems="center" gap="2">
              <NextImage src={Logo} width={32} height={32} />
              <Text fontSize="3xl">Mazer</Text>
            </Box>
          </a>
        </NextLink>
      </Box>
      <Box
        display="flex"
        flex={"1 1 auto"}
        justifyContent="center"
        flexBasis={"50%"}
        gap="8"
      >
        {buttonsInfo.map((buttonInfo) => (
          <InvisibleButton key={buttonInfo.name} buttonInfo={buttonInfo} />
        ))}
      </Box>
      <Box
        display="flex"
        flexBasis={"25%"}
        alignItems="center"
        justifyContent="end"
        gap="4"
        opacity={isLoading ? "0" : "100%"}
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
      </Box>
    </Box>
  );
};

export default Navbar;
