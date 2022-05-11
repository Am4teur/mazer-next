import React, { useState } from "react";
import type { NextPage } from "next";
import Router from "next/router";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  FormHelperText,
  Input,
  Box,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import axios from "axios";
import {
  getProviders,
  signIn,
  getSession,
  getCsrfToken,
} from "next-auth/react";
import GithubSVG from "../../public/GithubSVG";
import GoogleColoredSVG from "../../public/GoogleColoredSVG";

const ProvidersButtons = ({ providers }: any) => (
  <Flex direction="column" w="100%">
    {Object.values(providers).map(
      (provider: any) =>
        provider.name !== "Credentials" && (
          <Button
            key={provider.name}
            mb={6}
            bg={provider.name === "GitHub" ? "#24292E" : "white"}
            color={provider.name === "GitHub" ? "white" : "#000"}
            type="submit"
            onClick={() => {
              signIn(provider.id, {
                callbackUrl: `${process.env.URL_DEV}/`,
              });
            }}
          >
            {provider.name === "GitHub" && <GithubSVG />}
            {provider.name === "Google" && <GoogleColoredSVG />}
            <Box ml={2}>Sign in with {provider.name}</Box>
          </Button>
        )
    )}
  </Flex>
);

const Auth: NextPage = ({ providers }: any) => {
  const [authType, setAuthType] = useState("Login");
  const [beErrors, setBeErrors] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (actions: any) => {
    actions.setSubmitting(false);

    authType === "Login" ? loginUser() : registerUser();
  };

  const redirectToHome = () => {
    const { pathname } = Router;
    if (pathname === "/auth") {
      // TODO: redirect to a success register page
      Router.push("/");
    }
  };

  const registerUser = async () => {
    const res = await axios
      .post(
        "/api/register",
        { username, email, password },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then(async (res) => {
        setBeErrors({
          username: "",
          email: "",
          password: "",
        });
        await loginUser();
        redirectToHome();
      })
      .catch((error) => {
        setBeErrors(error.response.data);
      });
  };

  const loginUser = async () => {
    const loggedUser = await signIn("credentials", {
      // redirect: false,
      email: email,
      password: password,
      callbackUrl: `${window.location.origin}`,
    });

    console.log("Logged User: ", loggedUser);
  };

  return (
    // With flex-1 I only need w-full because its flex-row.
    // If it was flex-col, I would only need h-full.
    <div className="flex-1 h-full w-full flex justify-center items-center bg-auth bg-fixed bg-center bg-cover bg-no-repeat text-white">
      <div className="flex flex-col justify-center items-center bg-gradient-to-r from-white-transparent to-white-more-transparent rounded-md p-12 w-[420px]">
        <h2 className="leading-10 text-[24px] font-extrabold">{authType}</h2>
        {authType === "Login" ? (
          <span className="text-[14px] mb-6 font-normal">
            Not registered yet?{" "}
            <button
              className="underline"
              onClick={() => setAuthType("Register")}
            >
              Register
            </button>
          </span>
        ) : (
          <span className="text-[14px] mb-6 font-normal">
            Already have an account?{" "}
            <button className="underline" onClick={() => setAuthType("Login")}>
              Login
            </button>
          </span>
        )}

        <div className="w-full border-solid border-b-2 rounded-full mb-6"></div>

        <ProvidersButtons providers={providers} />

        <div className="flex w-full items-center justify-center gap-2 mb-4">
          <div className="w-full border-solid border-b-2 rounded-full flex-1"></div>
          <span>Or</span>
          <div className="w-full border-solid border-b-2 rounded-full flex-1"></div>
        </div>

        <Formik
          initialValues={{}} // { email: "", password: "" }
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={(values, actions) => {
            onSubmit(actions);
          }}
        >
          {(props) => (
            <Form className="flex flex-col w-full mb-4">
              {authType === "Register" && (
                <Field name="username">
                  {({ field, form }: any) => (
                    <FormControl isInvalid={Boolean(beErrors.username)} mb={6}>
                      <FormLabel htmlFor="username">Username:</FormLabel>
                      <Input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        id="username"
                        placeholder="Username"
                        background={"blue.600"}
                      />
                      <FormHelperText color="gray.300">
                        If not provided, your email will be used instead
                      </FormHelperText>
                      <FormErrorMessage>{beErrors.username}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              )}
              <Field name="email">
                {({ field, form }: any) => (
                  <FormControl
                    isRequired
                    isInvalid={Boolean(beErrors.email)}
                    mb={6}
                  >
                    <FormLabel htmlFor="email">Email:</FormLabel>
                    <Input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      id="email"
                      placeholder="Email Address"
                      background={"blue.600"}
                    />
                    <FormErrorMessage>{beErrors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="password">
                {({ field, form }: any) => (
                  <FormControl
                    isRequired
                    isInvalid={Boolean(beErrors.password)}
                    mb={3}
                  >
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      placeholder="Password"
                      background={"blue.600"}
                    />
                    <FormErrorMessage>{beErrors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button
                mt={6}
                bg="brand.blue-3"
                isLoading={props.isSubmitting}
                type="submit"
              >
                {authType}
              </Button>
            </Form>
          )}
        </Formik>
        {authType === "Login" && (
          <span className="text-[14px] font-normal">
            <a className="underline">Forgot password?</a>
          </span>
        )}
      </div>
    </div>
  );
};

export default Auth;

export async function getServerSideProps() {
  return {
    props: {
      providers: await getProviders(),
      session: await getSession(),
      csrfToken: await getCsrfToken(),
    },
  };
}
