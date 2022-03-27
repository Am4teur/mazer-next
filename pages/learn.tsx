import React from "react";
import NextLink from "next/link";

const Learn = () => {
  return (
    <React.Fragment>
      <h1>Learn</h1>
      <NextLink href="/" passHref>
        <button>Home</button>
      </NextLink>
    </React.Fragment>
  );
};

export default Learn;
