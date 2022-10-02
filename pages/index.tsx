import { Box, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import NextLink from "next/link";

const Home: NextPage = () => {
  const buttonsData: any[] = [
    { path: "/play", name: "Play" },
    { path: "/learn", name: "Learn" },
    { path: "/pathfinding", name: "Pathfinding" },
  ];
  return (
    <>
      <Head>
        <title>Mazer</title>
        <meta name="description" content="A Maze game" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>

      <div className="flex md:flex-row flex-col gap-4">
        {buttonsData.map((buttonData) => (
          <Box
            key={buttonData.path}
            backgroundColor={"brand.blue-5"}
            rounded="md"
            h={64}
            w={64}
            display="flex"
            alignItems="center"
            justifyContent="center"
            boxShadow="lg"
            textAlign="center"
          >
            <NextLink href={buttonData.path} passHref>
              <Text color="white" fontSize="6xl">
                {buttonData.name}
              </Text>
            </NextLink>
          </Box>
        ))}
      </div>
    </>
  );
};

export default Home;
