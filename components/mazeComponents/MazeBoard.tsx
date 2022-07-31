import { Box, Grid, GridItem } from "@chakra-ui/react";
import { IPlayer } from "player";
import { useRef, useState } from "react";
import MovableIcon from "./MovableIcon";
import Pokemon from "./Pokemon";

interface IMazeBoard {
  children: JSX.Element;
}

interface IMazeGrid {
  players: IPlayer[];
}

type NullableJSXElement = JSX.Element | null | undefined;

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
    //image-rendering: "pixalated"
  >
    {children}
  </Box>
);

const MazeGrid = ({ players }: IMazeGrid) => {
  console.log(players);

  const sizeX: number = 10;
  const sizeY: number = 10;
  const mazeGrid: NullableJSXElement[][] = Array.from(Array(sizeX), () =>
    new Array(sizeY).fill(null)
  );

  players.forEach((player: IPlayer) => {
    const { x, y, iconId } = player;
    mazeGrid[y][x] = player.ref;
  });

  return (
    <Grid
      w="100%"
      h="100%"
      templateColumns="repeat(10, 1fr)"
      templateRows="repeat(10, 1fr)"
    >
      {mazeGrid.map((row: NullableJSXElement[], rowIdx: number) =>
        row.map((element: NullableJSXElement, colIdx: number) => (
          <GridItem key={"" + rowIdx + colIdx}>
            {element ? element : null}
          </GridItem>
        ))
      )}
    </Grid>
  );
};

const MazeBoard = () => {
  const playersData = [
    {
      userId: "id123",
      username: "daniel",
      x: 2,
      y: 1,
      iconId: 9,
      ref: <MovableIcon iconId={9} />,
    },
    {
      userId: "id123",
      username: "daniel",
      x: 3,
      y: 2,
      iconId: 4,
      ref: <Pokemon pokemonId={4} />,
    },
  ];

  const playersRef = useRef(playersData);
  const [players, setPlayers] = useState(playersRef.current);

  return (
    <>
      <MazeBackground>
        <MazeGrid players={players}></MazeGrid>
      </MazeBackground>
    </>
  );
};

export default MazeBoard;
