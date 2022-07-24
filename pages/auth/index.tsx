import { useState } from "react";
import type { NextPage } from "next";
import Router from "next/router";
import NextLink from "next/link";
import { getProviders, signIn } from "next-auth/react";
import CustomHead from "@/components/CustomHead";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  FormHelperText,
  Input,
  Box,
  Text,
  Heading,
  Link,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import axios from "axios";
import GithubSVG from "@/public/auth/GithubSVG";
import GoogleColoredSVG from "@/public/auth/GoogleColoredSVG";

const ProvidersButtons = ({ providers }: any) => (
  <Flex direction="column" w="100%">
    {providers &&
      Object.values(providers).map(
        (provider: any) =>
          provider.name !== "Credentials" && (
            <Button
              key={provider.name}
              mb={6}
              bg={provider.name === "GitHub" ? "#24292E" : "white"}
              _hover={{
                bg: provider.name === "GitHub" ? "#24292E90" : "#ffffff90",
              }}
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

const Background = ({ children }: any) => (
  <Box
    display="flex"
    flex="1 1 auto"
    justifyContent="center"
    alignItems="center"
    backgroundImage="url('/auth/bg-blue-bubbles.svg')"
    backgroundSize="cover"
    backgroundRepeat="no-repeat"
    backgroundPosition="center"
    backgroundAttachment="fixed"
    width="100%"
    height="100vh"
    color="white"
  >
    {children}
  </Box>
);

interface IDivicerProps {
  word?: string;
}

const Divider = ({ word }: IDivicerProps) => {
  return (
    <>
      {word ? (
        <Flex
          w="100%"
          alignItems="center"
          justifyContent="center"
          gap={2}
          mb={4}
        >
          <Box w="100%" border="solid" borderBottom={2} rounded="full"></Box>
          <Text>Or</Text>
          <Box w="100%" border="solid" borderBottom={2} rounded="full"></Box>
        </Flex>
      ) : (
        <Box
          w="100%"
          border="solid"
          borderBottom={2}
          rounded="full"
          mb={6}
        ></Box>
      )}
    </>
  );
};

const Auth: NextPage = ({ providers }: any) => {
  const [authType, setAuthType] = useState("Login");
  const oppAuthType: { [key: string]: string } = {
    Login: "Register",
    Register: "Login",
  };
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
    await axios
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
      .then(async () => {
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
    const res: any = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
      callbackUrl: `${window.location.origin}`,
    });

    if (res.error) {
      res.error.includes("Email")
        ? setBeErrors({
            email: res.error,
            password: "",
            username: "",
          })
        : setBeErrors({
            email: "",
            password: res.error,
            username: "",
          });
    } else {
      redirectToHome();
    }
  };

  return (
    <>
      <CustomHead title={authType}></CustomHead>
      <Background>
        <Box
          w="420px"
          rounded="md"
          bgGradient="linear(to-r, #ffffff80, #ffffff20)"
          p={12}
        >
          <Flex direction="column" justifyContent="center" alignItems="center">
            <Heading size="xl">{authType}</Heading>
            <Text fontSize="sm" mb={6}>
              {authType === "Login"
                ? "Not registered yet? "
                : "Already have an account? "}
              <button onClick={() => setAuthType(oppAuthType[authType])}>
                <Text as="u">{oppAuthType[authType]}</Text>
              </button>
            </Text>

            <Divider />

            <ProvidersButtons providers={providers} />

            <Divider word="Or" />

            <Formik
              initialValues={{}}
              validateOnChange={false}
              validateOnBlur={false}
              onSubmit={(_, actions) => {
                onSubmit(actions);
              }}
            >
              {(props) => (
                <Box w="100%">
                  <Form>
                    <Box display="flex" flexDirection="column" mb={4}>
                      {authType === "Register" && (
                        <Field name="username">
                          {() => (
                            <FormControl
                              isInvalid={Boolean(beErrors.username)}
                              mb={6}
                            >
                              <FormLabel htmlFor="username">
                                Username:
                              </FormLabel>
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
                              <FormErrorMessage>
                                {beErrors.username}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      )}
                      <Field name="email">
                        {() => (
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
                            <FormErrorMessage>
                              {beErrors.email}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="password">
                        {() => (
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
                            <FormErrorMessage>
                              {beErrors.password}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Button
                        mt={6}
                        bg="brand.blue-3"
                        _hover={{ bg: "hsl(204, 100%, 70%)" }}
                        // hover is the brand.blue-3 from 47% to 70%
                        // https://www.w3schools.com/colors/colors_converter.asp
                        isLoading={props.isSubmitting}
                        type="submit"
                      >
                        {authType}
                      </Button>
                    </Box>
                  </Form>
                </Box>
              )}
            </Formik>
            {authType === "Login" && (
              <Text mt={2} fontSize="sm">
                <NextLink href="#" passHref>
                  <Link>
                    <Text as="u">Forgot password?</Text>
                  </Link>
                </NextLink>
              </Text>
            )}
          </Flex>
        </Box>
      </Background>
    </>
  );
};

export async function getServerSideProps() {
  return {
    props: {
      providers: await getProviders(),
    },
  };
}

export default Auth;
