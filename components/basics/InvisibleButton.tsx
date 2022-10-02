import { chakra, Text } from "@chakra-ui/react";
import { isValidMotionProp, motion } from "framer-motion";
import NextImage from "next/image";
import React from "react";
import { MazeIcon } from "../MazeIcon";

interface IInvisibleButtonProps {
  onClick?: () => void;
  ref?: React.Ref<HTMLButtonElement>;
  text: string;
  icon: string;
}

const MotionButton = chakra(motion.button, {
  // Allow motion props and the children prop to be forwarded.
  // All other chakra props not matching the motion props will still be forwarded.
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) ||
    prop === "children" ||
    prop === "ref" ||
    prop === "onClick",
});

const InvisibleButton = React.forwardRef(function helper(
  { onClick, ref, text, icon }: IInvisibleButtonProps,
  _
) {
  const variants = {
    initial: {},
    tap: { y: 2 },
    hover: {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      borderColor: "white",
      transition: {
        borderColor: { ease: "easeInOut" },
        ease: "easeInOut",
      },
    },
  };

  return (
    <MotionButton
      ref={ref}
      onClick={onClick}
      initial="initial"
      whileTap="tap"
      whileHover="hover"
      variants={variants}
      rounded="xl"
      px="6"
      py="2"
      color={"white"}
      cursor="pointer"
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
          alt={text + " Icon"}
          width={16}
          height={16}
          layout="fixed"
        />
      )}
      <Text>{text}</Text>
    </MotionButton>
  );
});

export default InvisibleButton;
