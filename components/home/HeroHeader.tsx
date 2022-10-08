import { Heading } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const HeroHeader = () => {
  const [word, setWord] = useState("Playing");

  useEffect(() => {
    const words = ["Playing", "Pathfinding", "Generating"];

    const rotateWordsLoop = setTimeout(() => {
      setWord((prevWord) => words[(words.indexOf(prevWord) + 1) % 3]);
    }, 4000);
    return () => clearTimeout(rotateWordsLoop);
  }, [word]);

  const container = {
    visible: {
      transition: {
        staggerChildren: 0.025,
      },
    },
  };

  return (
    <motion.div
      className="App"
      initial="hidden"
      animate="visible"
      variants={container}
    >
      <Heading fontSize="8xl" mb="12">
        Explore Mazes by{" "}
        <Heading
          as="span"
          fontSize="8xl"
          bgGradient={"linear(90deg,#f72585,#4cc9F0)"}
          style={{
            // @ts-ignore
            "-webkit-background-clip": "text",
            "-webkit-text-fill-color": "transparent",
          }}
        >
          {word}
          {/* <WavyText text={word} /> */}
        </Heading>
      </Heading>
    </motion.div>
  );
};

export default HeroHeader;
