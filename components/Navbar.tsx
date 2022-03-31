import React from "react";
import NextLink from "next/link";
import NextImage from "next/image";
import Button from "./basics/Button";
import Logo from "../public/favicon.ico";

const Navbar = () => {
  return (
    <nav className="logo flex justify-center items-center border-b-4 mx-4 bg-gray-500  rounded-full">
      <NextLink href="/" passHref>
        <a className="logo flex basis-1/4 items-center gap-2 ml-8">
          <NextImage src={Logo} width={32} height={32} />
          <span className="text-center text-2xl">Mazer</span>
          {/* change the font to 'gino nord' */}
        </a>
      </NextLink>
      <div className="flex flex-auto flex-basis-1/2 justify-center buttons gap-4">
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
      <div className="auth flex basis-1/4 gap-4 justify-end mr-8">
        <NextLink href="/login" passHref>
          <Button>Login</Button>
        </NextLink>
        <NextLink href="/register" passHref>
          <Button>Register</Button>
        </NextLink>
        {/* <Button>Temporary</Button> */}
      </div>
    </nav>
  );
};

export default Navbar;
