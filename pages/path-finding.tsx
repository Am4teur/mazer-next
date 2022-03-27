import React from "react";
import NextLink from "next/link";

const PathFinding = () => {
  return (
    <React.Fragment>
      <h1>Path Finding</h1>
      <NextLink href="/" passHref>
        <button>Home</button>
      </NextLink>
    </React.Fragment>
  );
};

export default PathFinding;
