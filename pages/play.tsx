import React from "react";
import NextLink from "next/link";

const Play = () => {
  return (
    <React.Fragment>
      <h1>Play</h1>
      <NextLink href="/" passHref>
        <button>Home</button>
      </NextLink>
    </React.Fragment>
  );
};

export default Play;
