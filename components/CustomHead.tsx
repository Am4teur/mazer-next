import React from "react";
import Head from "next/head";

interface ICustomeHeadProps {
  title: string;
  description?: string;
  icon?: string;
}

const CustomHead = ({ title, description, icon }: ICustomeHeadProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta
        name="description"
        content={description ? description : "Login to Mazer game"}
      />
      <link rel="icon" href={icon ? icon : "/favicon.ico"} />
      <link rel="shortcut icon" href={icon ? icon : "/favicon.ico"} />
    </Head>
  );
};

export default CustomHead;
