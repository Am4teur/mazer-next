import React from "react";
import NextLink from "next/link";

const Login = () => {
  return (
    <React.Fragment>
      <div>Login</div>
      <NextLink href="/" passHref>
        <button>Home</button>
      </NextLink>
    </React.Fragment>
  );
};

export default Login;
