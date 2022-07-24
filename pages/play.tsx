import { useEffect } from "react";
import NextLink from "next/link";
import { useSession, signIn } from "next-auth/react";
import Playground from "@/components/Playground";
import Router from "next/router";
// import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
// import unstable_getServerSession from "next-auth/next";
// import authOptions from "./api/auth/[...nextauth]";

const Play = () => {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  // not very happy with this, because I would like to have a solution like the one
  // on the Nextauth doc page (things that are commented)
  // https://next-auth.js.org/tutorials/securing-pages-and-api-routes
  const redirectToSignIn = () => {
    const { pathname } = Router;
    if (pathname === "/play") {
      Router.push("/auth");
    }
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!session) {
    redirectToSignIn();
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

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   return {
//     props: {
//       session: await unstable_getServerSession(
//         context.req, // why is this giving an error
//         context.res,
//         authOptions
//       ),
//     },
//   };
// };

export default Play;
