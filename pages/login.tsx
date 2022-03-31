import React from "react";
import NextLink from "next/link";

const Login = () => {
  return (
    <>
      <div>Login</div>
      <NextLink href="/" passHref>
        <button>Home</button>
      </NextLink>
    </>
  );
};

export default Login;
