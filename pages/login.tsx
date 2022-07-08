import NextLink from "next/link";
import CustomHead from "@/components/CustomHead";

const Login = () => {
  return (
    <>
      <CustomHead title="Login"></CustomHead>
      <div>Login</div>
      <NextLink href="/" passHref>
        <button>Home</button>
      </NextLink>
    </>
  );
};

export default Login;
