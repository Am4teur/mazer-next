import React, { useState, useEffect } from "react";
import NextLink from "next/link";
import { useSession, signIn } from "next-auth/react";
import Playground from "../components/Playground";

const Play = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  useEffect(() => {
    const securePage = async () => {
      if (!session) {
        signIn();
      }
    };

    securePage();
  }, [session]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <h1>Play</h1>
      <Playground isBoolean />
      <NextLink href="/" passHref>
        <button>Home</button>
      </NextLink>
    </>
  );
};

export default Play;
