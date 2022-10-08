import HeroSection from "@/components/home/HeroSection";
import HomeSection from "@/components/home/HomeSection";
import Separator from "@/components/home/Separator";
import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";

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

      <Box w="100%">
        <HeroSection />
        <Separator />
        <HomeSection
          heading="Play Section"
          buttonName="Play"
          image="Play Image"
        />
        <Separator />
        <HomeSection
          heading="Pathfind Algorithms Section"
          buttonName="Pathfind"
          image="Pathfind Image"
          textRight
        />
        <Separator />
        <HomeSection
          heading="Maze Generation Algorithms Section"
          buttonName="Maze Generation"
          image="Maze Generation Image"
        />
      </Box>
    </>
  );
};

export default Home;
