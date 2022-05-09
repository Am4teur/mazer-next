import React from "react";
import NextLink from "next/link";
import NextImage from "next/image";
import Button from "./basics/Button";
import Logo from "../public/favicon.ico";
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session, status } = useSession();
  console.log("session", session);

  const isLoading = status === "loading";

  return (
    <nav className="logo flex justify-center items-center border-b-4 mx-4 bg-gray-600 rounded-full text-gray-whiteish">
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
          <a>Learn Maze Creation</a>
        </NextLink>
      </div>
      <div
        className={`auth flex basis-1/4 gap-4 justify-end mr-8 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        {session ? (
          <Button onClick={() => signOut()}>Sign Out</Button>
        ) : (
          <>
            <NextLink href="/auth" passHref>
              <Button>Login</Button>
            </NextLink>
            {/* <NextLink href="/api/auth/signin" passHref>
              <Button onClick={() => signIn()}>Register</Button>
            </NextLink> */}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
