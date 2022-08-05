import MazeBoard from "@/components/mazeComponents/MazeBoard";
import axios from "axios";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import NextLink from "next/link";

const Play = ({ maze }: any) => {
  // @TODO temporary getMazes just for testing, delete later
  const getMazes = async () => {
    await axios
      .get(`${"/api/maze"}/`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then(async (res) => {
        console.log(res.data.mazes);
      })
      .catch((error) => {
        console.error("My error on maze.ts: " + error);
      });
  };

  return (
    <>
      <h1>Play</h1>
      <NextLink href="/" passHref>
        <button>Home</button>
      </NextLink>
      <button onClick={getMazes}>get mazes</button>
      <MazeBoard maze={maze} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  // probably this will give an error when we go to production because of edge functions
  // check: https://github.com/nextauthjs/next-auth/discussions/4265
  // this also might be useful: https://github.com/nextauthjs/next-auth/issues/2612
  // google search: 'nextauth incomingmessage' because
  // ctx.req is of type incomingmessage & { cookies }
  // but it should be of type NextApiRequest or similar
  const session = await getSession(ctx);

  if (!session) {
    return {
      redirect: { destination: "/auth", permanent: false },
    };
  }

  // @TODO remove hardcoded global mazeId
  const mazeId = "62ea92934373151e62bee566";
  const { maze, error } = await (
    await fetch(`${process.env.NEXTAUTH_URL}api/maze/${mazeId}`)
  ).json();

  return error
    ? {
        redirect: { destination: "/errorPage", permanent: false },
      }
    : {
        props: { maze: maze },
      };
};

export default Play;
