import React from "react";
import NextLink from "next/link";
import CustomHead from "../components/CustomHead";

const PathFinding = () => {
  return (
    <>
      <CustomHead title="Path Finding"></CustomHead>
      <h1>Path Finding</h1>
      <NextLink href="/" passHref>
        <button>Home</button>
      </NextLink>
    </>
  );
};

export default PathFinding;
