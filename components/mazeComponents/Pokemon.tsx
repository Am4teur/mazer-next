import { Box } from "@chakra-ui/react";
import NextImage from "next/image";

interface IPokemon {
  id: number;
  h?: number;
  w?: number;
}

const Pokemon = ({ id, h = 32, w = 32 }: IPokemon) => {
  // change default h & w when change to better 63x32 pokemon images
  const isIdAvailable = id > 0 && id < 11; // 184 or 200
  return isIdAvailable ? (
    <Box h={`${h}px`} w={`${w}px`}>
      <NextImage
        src={`/pokemonArt/Imgur Album Gen 1 All Forms Pixel Art 800x800/${id}.png`}
        height={h}
        width={w}
      ></NextImage>
    </Box>
  ) : (
    <Box h={h} w={w} backgroundColor={"blue.300"}></Box>
  );
};

export default Pokemon;
