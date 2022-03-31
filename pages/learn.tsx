import React from "react";
import NextLink from "next/link";

const Learn = () => {
  return (
    <>
      <h1>Learn</h1>
      <NextLink href="/" passHref>
        <button>Home</button>
      </NextLink>
    </>
  );
};

export default Learn;
