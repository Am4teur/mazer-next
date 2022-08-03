import { Box } from "@chakra-ui/react";
import NextImage from "next/image";

interface IPokemon {
  h?: number;
  w?: number;
  pokemonId: number;
}

const Pokemon = ({ h = 64, w = 64, pokemonId }: IPokemon) => {
  // change default h & w when change to better 64x32 pokemon images

  const isIdAvailable = pokemonId > 0 && pokemonId < 11; // 184 or 200

  return isIdAvailable ? (
    <Box h={`${h}px`} w={`${w}px`} position="absolute">
      <NextImage
        src={`/pokemonArt/Imgur Album Gen 1 All Forms Pixel Art 800x800/${pokemonId}.png`}
        height={h}
        width={w}
      ></NextImage>
    </Box>
  ) : (
    <Box h={h} w={w} backgroundColor={"blue.300"}></Box>
  );
};

export default Pokemon;
