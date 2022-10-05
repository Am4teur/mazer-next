import { chakra } from "@chakra-ui/react";
import { isValidMotionProp, motion } from "framer-motion";
import NextLink from "next/link";
import React from "react";

interface ICustomButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
}

const MotionLink = chakra(motion.a, {
  // Allow motion props and the children prop to be forwarded.
  // All other chakra props not matching the motion props will still be forwarded.
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) ||
    prop === "children" ||
    prop === "onClick" ||
    prop === "href",
});

const CustomButton = React.forwardRef(function helper(
  { children, href = "", onClick }: ICustomButtonProps,
  _
) {
  return (
    <NextLink href={href} passHref>
      <MotionLink
        whileTap={{ y: 2 }}
        whileHover={{ scale: 1.1 }}
        onClick={onClick}
        rounded="lg"
        shadow="lg"
        px="6"
        py="2"
        color={"white"}
        display="flex"
        gap="0.75rem"
        alignItems="center"
        backgroundColor={"brand.blue-3"}
      >
        {children}
      </MotionLink>
    </NextLink>
  );
});

export default CustomButton;
