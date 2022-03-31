import React from "react";
import NextLink from "next/link";

const Play = () => {
  return (
    <>
      <h1>Play</h1>
      <NextLink href="/" passHref>
        <button>Home</button>
      </NextLink>
    </>
  );
};

export default Play;
