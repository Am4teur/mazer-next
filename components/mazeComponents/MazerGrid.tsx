import { Node } from "@/objects/mazeUtils";
import { Grid, GridItem } from "@chakra-ui/react";
import MazeNode from "./MazeNode";

interface IMazeGrid {
  generatedMazeGrid: Node[][];
}

const MazeGrid = ({ generatedMazeGrid }: IMazeGrid) => {
  return (
    <>
      <Grid
        w="100%"
        h="100%"
        templateColumns="repeat(10, 1fr)"
        templateRows="repeat(10, 1fr)"
        gap={0}
      >
        {generatedMazeGrid.map((row: Node[], rowIdx: number) =>
          row.map((node: Node, colIdx: number) => (
            <GridItem key={"" + rowIdx + colIdx}>
              <MazeNode node={node} />
            </GridItem>
          ))
        )}
      </Grid>
    </>
  );
};

export default MazeGrid;
