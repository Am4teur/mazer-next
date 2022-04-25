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
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import axios from "axios";
import {
  getProviders,
  signIn,
  getSession,
  getCsrfToken,
} from "next-auth/react";
import NextImage from "next/image";

const ProvidersButtons = ({ providers }: any) => (
  <Flex direction="column" w="100%">
    {Object.values(providers).map(
      (provider: any) =>
        provider.id !== "email-password" && (
          <Button
            key={provider.name}
            mb={6}
            bg="brand.blue-3"
            type="submit"
            onClick={() => {
              signIn(provider.id, {
                callbackUrl: `${process.env.URL_DEV}/`,
              });
            }}
          >
            {/* <NextImage src="/google-color.svg" width="16" height="16" /> */}
            Sign in with {provider.name}
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

  const onSubmit = (values: any, actions: any) => {
    const { username, email, password } = values;

    actions.setSubmitting(false);

    authType === "Login"
      ? loginUser(email, password)
      : registerUser(username, email, password);
  };

  const redirectToHome = () => {
    const { pathname } = Router;
    if (pathname === "/auth/auth") {
      // TODO: redirect to a success register page
      Router.push("/");
    }
  };

  const registerUser = async (
    username: string,
    email: string,
    password: string
  ) => {
    //register
    //  api to register to DB
    //    check if any errors and present them in the register form
    //    including email not confirmed yet
    //  send email for confirmation
    //  (DB has to have a "confirmed" field)

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
      .then((res) => {
        // update context with res
        setBeErrors({
          username: "",
          email: "",
          password: "",
        });
        redirectToHome();
      })
      .catch((error) => {
        setBeErrors(error.response.data);
      });
  };

  const loginUser = async (email: string, password: string) => {
    const status = await signIn("credentials", {
      // redirect: false,
      email: email,
      password: password,
    });
    console.log("status: ", status);
    return;

    const res = await axios
      .post(
        "/api/login",
        { email, password },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setBeErrors({
          username: "",
          email: "",
          password: "",
        });
        redirectToHome();
      })
      .catch((error) => {
        // check this
        setBeErrors(error.response.data);
      });
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
            onSubmit(values, actions);
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
                        {...field}
                        id="username"
                        placeholder="Username"
                        background={"blue.600"}
                      />
                      <FormHelperText color="gray.300">
                        If not provided, we will use your email
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
                      {...field}
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
                      {...field}
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
