import { Box, Grid, GridItem } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { IPlayer } from "player";
import { useRef, useState } from "react";
import MovableIcon from "./MovableIcon";
import Pokemon from "./Pokemon";

interface IMazeBoard {
  children: JSX.Element;
}

interface IMazeGrid {
  players: Map<string, IPlayer>;
  currentUserId: string;
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
    //image-rendering: "pixalated"
  >
    {children}
  </Box>
);

const MazeGrid = ({ players, currentUserId }: IMazeGrid) => {
  const sizeX: number = 10;
  const sizeY: number = 10;
  const mazeGrid: JSX.Element[][][] = Array.from(Array(sizeX), () =>
    new Array(sizeY).fill([])
  );

  const getIconRef = (player: IPlayer): JSX.Element => {
    const { userId, iconId } = player;
    return userId === currentUserId ? (
      <MovableIcon iconId={iconId} />
    ) : (
      <Pokemon pokemonId={iconId} />
    );
  };

  Object.values(players).forEach((player: IPlayer) => {
    const { x, y } = player;
    mazeGrid[y][x] = [...mazeGrid[y][x], getIconRef(player)];
  });

  return (
    <Grid
      w="100%"
      h="100%"
      templateColumns="repeat(10, 1fr)"
      templateRows="repeat(10, 1fr)"
    >
      {mazeGrid.map((row: JSX.Element[][], rowIdx: number) =>
        row.map((playerIconList: JSX.Element[], colIdx: number) => (
          <GridItem key={"" + rowIdx + colIdx}>
            {playerIconList.map((playerIcon) =>
              playerIcon ? playerIcon : null
            )}
          </GridItem>
        ))
      )}
    </Grid>
  );
};

const MazeBoard = ({ maze }: any) => {
  const playersRef = useRef(maze.players);
  const [players, setPlayers] = useState(playersRef.current);
  const { data: session } = useSession();
  const currentUserId = session?.user.id || "";

  return (
    <>
      <MazeBackground>
        <MazeGrid players={players} currentUserId={currentUserId}></MazeGrid>
      </MazeBackground>
    </>
  );
};

export default MazeBoard;
