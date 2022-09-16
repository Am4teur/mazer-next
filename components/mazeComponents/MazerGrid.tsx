import { Box } from "@chakra-ui/react";
import { IPlayer } from "player";
import MovableIcon from "./MovableIcon";

interface IMazeGrid {
  players: Map<string, IPlayer>;
}

const MazeGrid = ({ players }: IMazeGrid) => {
  const sizeX: number = 10;
  const sizeY: number = 10;
  const mazeGrid: JSX.Element[][][] = Array.from(Array(sizeX), () =>
    new Array(sizeY).fill([])
  );

  const playersRefs: JSX.Element[] = [];
  players.forEach((player: IPlayer) => {
    playersRefs.push(<MovableIcon key={player.userId} player={player} />);
  });

  return (
    <Box w="100%" h="100%">
      {playersRefs}
    </Box>
  );
};

export default MazeGrid;
