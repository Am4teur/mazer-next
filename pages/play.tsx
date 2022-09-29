import MazeBoard from "@/components/mazeComponents/MazeBoard";
import { configureAbly } from "@ably-labs/react-hooks";
import { Box, Heading } from "@chakra-ui/react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import { IPlayer } from "player";

configureAbly({
  authUrl: `${process.env.URL_DEV}/api/createTokenRequest`,
});

const Play = ({ maze }: any) => {
  const newMaze = {
    ...maze,
    players: new Map<string, IPlayer>(Object.entries(maze.players)),
  };

  return (
    <Box py="2rem">
      <Heading textColor={"white"} size="4xl" textAlign="center" mb="8">
        Play
      </Heading>

      <MazeBoard maze={newMaze} />
    </Box>
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
