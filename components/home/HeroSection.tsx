import { generateMaze } from "@/objects/mazeUtils";
import { Box, Text } from "@chakra-ui/react";
import { IPlayer } from "player";
import { useMemo } from "react";
import MazeGrid from "../mazeComponents/MazerGrid";
import MovableIcon from "../mazeComponents/MovableIcon";
import HeroHeader from "./HeroHeader";
import Overlay from "./Overlay";

const NUM_ROWS = 6;
const NUM_COLS = 6;
const MAX_PLAYER = NUM_ROWS - 1;
const MIN_PLAYER = 0;
const NUM_POKEMONS = 10;
const MIN_POKEMON = 1;

const HeroSection = () => {
  const generatedMazeGrid = useMemo(
    () => generateMaze(Math.random(), NUM_ROWS, NUM_COLS),
    []
  );

  const fakePlayers: Map<string, IPlayer> = new Map<string, IPlayer>([
    [
      "randomId1",
      {
        userId: "randomId1",
        username: "randomUsername1",
        x: Math.floor(
          Math.random() * (MAX_PLAYER - MIN_PLAYER + 1) + MIN_PLAYER
        ),
        y: Math.floor(
          Math.random() * (MAX_PLAYER - MIN_PLAYER + 1) + MIN_PLAYER
        ),
        iconId: Math.floor(
          Math.random() * (NUM_POKEMONS - MIN_POKEMON + 1) + MIN_POKEMON
        ),
      },
    ],
    [
      "randomId2",
      {
        userId: "randomId2",
        username: "randomUsername2",
        x: Math.floor(
          Math.random() * (MAX_PLAYER - MIN_PLAYER + 1) + MIN_PLAYER
        ),
        y: Math.floor(
          Math.random() * (MAX_PLAYER - MIN_PLAYER + 1) + MIN_PLAYER
        ),
        iconId: Math.floor(
          Math.random() * (NUM_POKEMONS - MIN_POKEMON + 1) + MIN_POKEMON
        ),
      },
    ],
  ]);

  const playersIconRefs: JSX.Element[] = [];
  fakePlayers.forEach((player: IPlayer) => {
    playersIconRefs.push(<MovableIcon key={player.userId} player={player} />);
  });

  return (
    <Box display="flex" justifyContent="center" alignItems="center" w="100%">
      <Box flexBasis="60%">
        <HeroHeader />
        <Text fontSize="2xl">Explore and Interact with mazes</Text>
        {/* <Text >Less than 1 minute.</Text>
        <Button>Tutorial</Button> */}
      </Box>
      <Box flexBasis="40%" display="flex" justifyContent="center">
        {/* <NextImage src="/home/HeroImage.png" width="400px" height="400px" /> */}
        <Box overflow="hidden" rounded="lg">
          <Overlay />
          {playersIconRefs}
          <MazeGrid generatedMazeGrid={generatedMazeGrid} />
        </Box>
      </Box>
    </Box>
  );
};

export default HeroSection;
