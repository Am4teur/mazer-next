import type { NextPage } from "next";
import Head from "next/head";
import NextLink from "next/link";
import Button from "@/components/basics/Button";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Mazer</title>
        <meta name="description" content="A Maze game" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>

      <div className="flex md:flex-row flex-col gap-4">
        <div className="flex justify-center items-center border-solid border-2 border-gray-700 rounded-md shadow-lg w-64 h-64">
          <NextLink href="/play" passHref>
            <Button>play</Button>
          </NextLink>
        </div>
        <div className="flex justify-center items-center border-solid border-2 border-gray-700 rounded-md shadow-lg w-64 h-64">
          <NextLink href="/learn" passHref>
            <Button>learn</Button>
          </NextLink>
        </div>
        <div className="flex justify-center items-center border-solid border-2 border-gray-700 rounded-md shadow-lg w-64 h-64">
          <NextLink href="/path-finding" passHref>
            <Button>path finding</Button>
          </NextLink>
        </div>
      </div>
    </>
  );
};

export default Home;
