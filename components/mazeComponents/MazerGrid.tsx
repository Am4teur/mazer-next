import { Grid, GridItem } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { IPlayer } from "player";
import MovableIcon from "./MovableIcon";
import Pokemon from "./Pokemon";

interface IMazeGrid {
  players: Map<string, IPlayer>;
  publish: any;
}

const MazeGrid = ({ players, publish }: IMazeGrid) => {
  const sizeX: number = 10;
  const sizeY: number = 10;
  const mazeGrid: JSX.Element[][][] = Array.from(Array(sizeX), () =>
    new Array(sizeY).fill([])
  );
  const { data: session } = useSession();
  const userId = session?.user.id || "";

  const getIconRef = (player: IPlayer): JSX.Element => {
    const { userId: playerUserId, iconId } = player;
    return playerUserId === userId ? (
      <MovableIcon key={player.userId} iconId={iconId} publish={publish} />
    ) : (
      <Pokemon key={player.userId} pokemonId={iconId} />
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

export default MazeGrid;
