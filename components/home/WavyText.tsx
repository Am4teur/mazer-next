import { chakra, shouldForwardProp } from "@chakra-ui/react";
import {
  HTMLMotionProps,
  isValidMotionProp,
  motion,
  Variants,
} from "framer-motion";
import { useEffect, useState } from "react";

interface Props extends HTMLMotionProps<"div"> {
  text: string;
  delay?: number;
  duration?: number;
}

const WavyText = ({ text, delay = 0, duration = 0.05, ...props }: Props) => {
  const [letters, setLetters] = useState(Array.from(text));

  useEffect(() => {
    setLetters(Array.from(text));
  }, [text]);

  const container: Variants = {
    hidden: {
      opacity: 0,
    },
    visible: (i: number = 1) => ({
      opacity: 1,
      transition: {
        staggerChildren: duration,
        delayChildren: i * delay,
      },
    }),
  };

  const child: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
  };

  const mystyles = {
    display: "inline-flex",
    overflow: "hidden",
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
  } as React.CSSProperties;

  const ChakraBox = chakra(motion.span, {
    shouldForwardProp: (prop) =>
      isValidMotionProp(prop) || shouldForwardProp(prop),
  });

  return (
    <ChakraBox
      variants={container}
      initial="hidden"
      animate="visible"
      style={mystyles}
      fontSize="8xl"
      bgGradient="linear(90deg,#f72585,#4cc9F0)"
    >
      {letters.map((letter, index) => (
        <motion.span key={index} variants={child}>
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </ChakraBox>
  );
};

export default WavyText;
