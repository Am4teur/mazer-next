import { Node } from "@/objects/mazeUtils";
import { Box, Grid, GridItem } from "@chakra-ui/react";

interface IMazeNode {
  node: Node;
}
interface IMazeBackground {
  imagePosition: string;
}

const MazeBackground = ({ imagePosition }: IMazeBackground) => (
  <Box
    display="flex"
    // flex="1 1 auto"
    justifyContent="center"
    alignItems="center"
    backgroundImage={`url('/pokemonArt/terrain/${imagePosition}.png')`}
    backgroundSize="cover"
    backgroundRepeat="no-repeat"
    backgroundPosition="center"
    w="16px"
    h="16px"
    color="white"
    //image-rendering: "pixalated"
  />
);

const getImagePosition = (node: Node, i: number, j: number): string => {
  if (i === 0) {
    // top
    return node.N ? "center" : "top";
  }
  if (j === 4) {
    // right
    return node.E ? "center" : "right";
  }
  if (i === 4) {
    // bottom
    return node.S ? "center" : "bottom";
  }
  if (j === 0) {
    // left
    return node.W ? "center" : "left";
  }
  return "center";
};

const MazeNode = ({ node }: IMazeNode) => {
  const fourByFourNode: any[][] = [];
  for (let i = 0; i < 4; i++) {
    fourByFourNode.push([]);
    for (let j = 0; j < 4; j++) {
      const imagePosition: string = getImagePosition(node, i, j);
      fourByFourNode[i].push(
        <MazeBackground key={"" + i + j} imagePosition={imagePosition} />
      );
    }
  }

  return (
    <Grid
      w="64px"
      h="64px"
      templateColumns="repeat(4, 1fr)"
      templateRows="repeat(4, 1fr)"
      gap={0}
    >
      {fourByFourNode.map((row: any[], rowIdx: number) =>
        row.map((node: any, colIdx: number) => (
          <GridItem key={"" + rowIdx + colIdx}>
            {fourByFourNode[rowIdx][colIdx]}
          </GridItem>
        ))
      )}
    </Grid>
  );
};

export default MazeNode;
