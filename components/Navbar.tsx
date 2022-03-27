import React from "react";
import NextLink from "next/link";
import Button from "./basics/Button";

const Navbar = () => {
  return (
    <nav className="logo flex justify-center items-center border-b-4">
      <div className="logo flex basis-1/4">
        <span>Logo</span>
      </div>
      <div className="flex flex-auto flex-basis-1/2 justify-center buttons">
        <NextLink href="/play">
          <a>Play</a>
        </NextLink>
        <NextLink href="/path-finding">
          <a>Path Finding</a>
        </NextLink>
        <NextLink href="/learn">
          <a>Learn</a>
        </NextLink>
      </div>
      <div className="auth flex basis-1/4 gap-2">
        <Button>Login</Button>
        <Button>Register</Button>
        <Button>Temporary</Button>
      </div>
    </nav>
  );
};

export default Navbar;
