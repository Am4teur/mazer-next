import React, { useState } from "react";
import NextLink from "next/link";
import CustomHead from "../components/CustomHead";
import { useSession } from "next-auth/react";
import Button from "../components/basics/Button";
import { Input } from "@chakra-ui/react";

const Profile = () => {
  const [username, setUsername] = useState("");
  const { data: session, status } = useSession();
  console.log("session", session);

  const isLoading = status === "loading";

  const changeUsername = () => {
    session!.user.username = username;
    //change on DB
  };

  return (
    <>
      <CustomHead title="Profile"></CustomHead>
      <h1>Profile</h1>
      {Object.entries(session && session.user ? session.user : {}).map(
        (value, key) => {
          return <span key={key}>{value.toString()}</span>;
        }
      )}
      <Input value={username} onChange={(e) => setUsername(e.target.value)} />
      <Button onClick={changeUsername}>Change Username</Button>
      <NextLink href="/" passHref>
        <Button>Home</Button>
      </NextLink>
    </>
  );
};

export default Profile;
