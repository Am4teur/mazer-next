import { chakra, Text } from "@chakra-ui/react";
import { isValidMotionProp, motion } from "framer-motion";
import NextImage from "next/image";
import NextLink from "next/link";
import React from "react";
import { MazeIcon } from "../MazeIcon";

interface IInvisibleButtonProps {
  buttonInfo: { name: string; icon: string; path: string };
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

const InvisibleButton = React.forwardRef(function helper(
  { onClick, buttonInfo: { name, icon, path } }: IInvisibleButtonProps,
  _
) {
  const variants = {
    initial: {},
    tap: { y: 2 },
    hover: {
      scale: 1.1,
      backgroundColor: "rgba(255, 255, 255, 0.3)",
      borderColor: "white",
      transition: {
        borderColor: { ease: "easeInOut" },
        ease: "easeInOut",
      },
    },
  };

  return (
    <NextLink href={path} passHref>
      <MotionLink
        onClick={onClick}
        initial="initial"
        whileTap="tap"
        whileHover="hover"
        variants={variants}
        rounded="xl"
        px="6"
        py="2"
        borderWidth="1px"
        borderStyle="solid"
        borderColor="transparent"
        display="flex"
        gap="0.75rem"
        alignItems="center"
      >
        {icon === "MazeIcon" ? (
          <MazeIcon h={16} w={16} />
        ) : (
          <NextImage
            src={icon}
            alt={name + " Icon"}
            width={16}
            height={16}
            layout="fixed"
          />
        )}
        <Text>{name}</Text>
      </MotionLink>
    </NextLink>
  );
});

export default InvisibleButton;
