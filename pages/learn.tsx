import React from "react";
import NextLink from "next/link";
import CustomHead from "../components/CustomHead";

const Learn = () => {
  return (
    <>
      <CustomHead title="Learn"></CustomHead>
      <h1>Learn</h1>
      <NextLink href="/" passHref>
        <button>Home</button>
      </NextLink>
    </>
  );
};

export default Learn;
