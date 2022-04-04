import React from "react";
import NextLink from "next/link";
import CustomHead from "../components/CustomHead";
import { Formik, Field, Form } from "formik";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Heading,
} from "@chakra-ui/react";

const Register = ({ users }: any) => {
  const registerUser = async (values: any) => {
    const { username, password } = values;

    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((t) => t.json());

    alert(JSON.stringify(res, null, 2));
  };

  const validateUsername = (value: string) => {
    let error;
    if (!value) {
      error = "Username is required";
    } else if (value.length < 3) {
      error = "Username must have at least 3 letters";
    }
    // https://formik.org/docs/overview
    //   if (!values.email) {
    //     errors.email = 'Required';
    //   } else if (
    //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    //   ) {
    //     errors.email = 'Invalid email address';
    //   }
    //   return errors;
    // }}
    return error;
  };

  const validatePassword = (value: string) => {
    let error;
    if (!value) {
      error = "Password is required";
    } else if (value.length < 6) {
      error = "Password must have at least 6 letters";
    }
    return error;
  };

  const getUsers = async () => {
    const url: string = "http://localhost:3000";
    let res = await fetch(`${url}/api/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { data: users } = await res.json();

    alert(JSON.stringify(users, null, 2));
  };

  return (
    <>
      <CustomHead title="Register"></CustomHead>
      <div className="w-[728px] p-12 border-solid border-4 border-blue-3 rounded-md bg-gray-600 text-white">
        <Heading mb={6}>Register</Heading>
        <Formik
          initialValues={{}} // { username: "", password: "" }
          onSubmit={(values, actions) => {
            registerUser(values);
            setTimeout(() => {
              actions.setSubmitting(false);
            }, 1000);
          }}
        >
          {(props) => (
            <Form>
              <Field name="username" validate={validateUsername}>
                {({ field, form }: any) => (
                  <FormControl
                    isInvalid={form.errors.username && form.touched.username}
                  >
                    <FormLabel htmlFor="username">Username</FormLabel>
                    <Input {...field} id="username" placeholder="username" />
                    <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <div className="mb-4"></div>
              <Field name="password" validate={validatePassword}>
                {({ field, form }: any) => (
                  <FormControl
                    isInvalid={form.errors.password && form.touched.password}
                  >
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input {...field} type="password" placeholder="password" />
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button
                mt={6}
                bg="brand.blue-3"
                isLoading={props.isSubmitting}
                type="submit"
              >
                Register
              </Button>
            </Form>
          )}
        </Formik>
      </div>
      <div className="m-8">
        <NextLink href="/" passHref>
          <button>Home</button>
        </NextLink>
      </div>
      <div className="m-8">
        <Button onClick={getUsers}>Get Users</Button>
      </div>
    </>
  );
};

export default Register;

export async function getServerSideProps(context: any) {
  let res = await fetch("http://localhost:3000/api/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  let { data: users } = await res.json();
  users = users ? users : null;

  return {
    users,
  };
}
