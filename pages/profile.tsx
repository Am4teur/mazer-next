import CustomButton from "@/components/basics/CustomButton";
import CustomHead from "@/components/CustomHead";
import { Input } from "@chakra-ui/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import NextLink from "next/link";
import { useState } from "react";

const Profile = () => {
  const [username, setUsername] = useState("");
  const { data: session, status } = useSession();
  console.log("session", session);

  const isLoading = status === "loading";

  const changeUsername = () => {
    session!.user.username = username;
    //change on DB
  };

  const getInfoFromDB = async () => {
    await axios
      .get("/api/users", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then(async (res) => {
        alert(JSON.stringify(res, null, 2));
      })
      .catch((error) => {
        console.error(" My error on profile.tsx: " + error);
      });
  };

  return (
    <>
      <CustomHead title="Profile"></CustomHead>
      <h1>Profile</h1>
      {session ? (
        <>
          {Object.entries(session?.user ? session.user : {}).map(
            (value, key) => {
              return <span key={key}>{value.toString()}</span>;
            }
          )}
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="New Username"
            width="auto"
            borderColor="gray.500"
          />
          <CustomButton onClick={changeUsername}>Change Username</CustomButton>
        </>
      ) : (
        <div>Access Denied</div>
      )}
      <NextLink href="/" passHref>
        <CustomButton>Home</CustomButton>
      </NextLink>
      <CustomButton onClick={getInfoFromDB}>Get Users</CustomButton>
    </>
  );
};

export default Profile;
