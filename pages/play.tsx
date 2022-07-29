import Playground from "@/components/Playground";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession, useSession } from "next-auth/react";
import NextLink from "next/link";

const Play = () => {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <h1>Play</h1>
      <NextLink href="/" passHref>
        <button>Home</button>
      </NextLink>
      <Playground />
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

  return {
    props: {
      session,
    },
  };
};

export default Play;
