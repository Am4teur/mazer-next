import { Heading, Input } from "@chakra-ui/react";
import React from "react";

const auth = () => {
  return (
    // With flex-1 I only need w-full because its flex-row.
    // If it was flex-col, I would only need h-full.
    <div className="flex-1 h-full w-full flex justify-center items-center bg-auth bg-fixed bg-center bg-cover bg-no-repeat">
      <div className="flex flex-col justify-center items-center w-64 h-64 bg-white rounded-md">
        <div className="flex flex-col justify-center items-center">
          <Heading>Login</Heading>
          <div>Not registered yet? Register</div>
          <div>------</div>
        </div>
        <div>
          <label>Email:</label>
          <Input type="text"></Input>
        </div>
        <div>
          <label>Password:</label>
          <Input type="password"></Input>
        </div>
        <button>Submit</button>
        <div>disclaimer</div>
      </div>
    </div>
  );
  //rgb(16, 80, 147) url("./background.svg") no-repeat fixed center center
};

export default auth;
