import { Box, Grid, GridItem } from "@chakra-ui/react";
import { IPlayer } from "player";
import Pokemon from "./Pokemon";

interface IMazeBoard {
  children: JSX.Element;
}
interface IMazeGrid {
  players: IPlayer[];
}

const MazeBackground = ({ children }: IMazeBoard) => (
  <Box
    display="flex"
    // flex="1 1 auto"
    justifyContent="center"
    alignItems="center"
    backgroundImage="url('/pokemonArt/terrain/center.svg')"
    backgroundSize="cover"
    backgroundRepeat="no-repeat"
    backgroundPosition="center"
    w="640px"
    h="640px"
    color="white"
  >
    {children}
  </Box>
);

const MazeGrid = ({ players }: IMazeGrid) => {
  const sizeX: number = 10;
  const sizeY: number = 10;
  const mazeGrid: (JSX.Element | null)[][] = Array.from(Array(sizeX), () =>
    new Array(sizeY).fill(null)
  );

  players.forEach((player: IPlayer) => {
    const { x, y, iconId } = player;
    mazeGrid[y][x] = <Pokemon id={iconId} />;
  });

  return (
    <Grid
      w="100%"
      h="100%"
      templateColumns="repeat(10, 1fr)"
      templateRows="repeat(10, 1fr)"
    >
      {mazeGrid.map((row: (JSX.Element | null)[], idx1: number) =>
        row.map((element: JSX.Element | null, idx2: number) => (
          <GridItem key={"" + idx2 + idx1}>{element ? element : null}</GridItem>
        ))
      )}
    </Grid>
  );
};

const MazeBoard = () => {
  const players: IPlayer[] = [
    { userId: "id123", username: "daniel", x: 2, y: 1, iconId: 1 },
    { userId: "id123", username: "daniel", x: 3, y: 2, iconId: 4 },
  ];

  return (
    <>
      <MazeBackground>
        <MazeGrid players={players}></MazeGrid>
      </MazeBackground>
    </>
  );
};

export default MazeBoard;
