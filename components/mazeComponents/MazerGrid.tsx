import { Grid, GridItem } from "@chakra-ui/react";
import { IPlayer } from "player";
import MovableIcon from "./MovableIcon";

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

  Object.values(players).forEach((player: IPlayer) => {
    const { x, y } = player;
    mazeGrid[y][x] = [
      ...mazeGrid[y][x],
      <MovableIcon key={player.userId} player={player} publish={publish} />,
    ];
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
