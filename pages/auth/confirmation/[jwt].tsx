import React, { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const Confirmation = () => {
  const router = useRouter();
  const { jwt } = router.query;
  console.log(jwt);

  useEffect(() => {
    axios.post(
      "/api/confirmation",
      { jwt },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
  }, [jwt]);

  return <div>Your email is confirmed!</div>;
};

export default Confirmation;
