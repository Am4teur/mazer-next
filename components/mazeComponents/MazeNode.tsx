import { Node } from "@/objects/mazeUtils";
import { Box, Grid, GridItem } from "@chakra-ui/react";

interface IMazeNode {
  node: Node;
}
interface IMazeBackground {
  imagePosition: string;
}

const MazeBackground = ({ imagePosition }: IMazeBackground) => (
  // @TODO small improvement, refactor this component to use
  // NextJS Image component or ChakraUI and then try to use the imageRendering: "pixelated"
  <Box
    display="flex"
    // flex="1 1 auto"
    justifyContent="center"
    alignItems="center"
    backgroundImage={`url('/pokemonArt/terrain/${imagePosition}.svg')`}
    backgroundSize="cover"
    backgroundRepeat="no-repeat"
    backgroundPosition="center"
    w="16px"
    h="16px"
    color="white"
    // image-rendering: "pixelated"
  />
);

const getImagePosition = (node: Node, i: number, j: number): string => {
  if (i === 0) {
    // top
    if (j === 0) {
      // 1 top left
      return node.N
        ? node.W
          ? "grass_top_left_corner"
          : "grass_left"
        : node.W
        ? "grass_top"
        : "grass_bottom_right_incorner";
    }
    if (j === 3) {
      // 2 top right
      return node.N
        ? node.E
          ? "grass_top_right_corner"
          : "grass_right"
        : node.E
        ? "grass_top"
        : "grass_bottom_left_incorner";
    }
    return node.N ? "grass_center" : "grass_top";
  }

  if (i === 3) {
    // bottom
    if (j === 0) {
      // 3 bottom left
      return node.S
        ? node.W
          ? "grass_bottom_left_corner"
          : "grass_left"
        : node.W
        ? "grass_bottom"
        : "grass_top_right_incorner";
    }
    if (j === 3) {
      // 4 bottom right
      return node.S
        ? node.E
          ? "grass_bottom_right_corner"
          : "grass_right"
        : node.E
        ? "grass_bottom"
        : "grass_top_left_incorner";
    }
    return node.S ? "grass_center" : "grass_bottom";
  }
  if (j === 3) {
    // right
    return node.E ? "grass_center" : "grass_right";
  }
  if (j === 0) {
    // left
    return node.W ? "grass_center" : "grass_left";
  }
  return "grass_center";
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
          <GridItem key={"" + rowIdx + colIdx}>{node}</GridItem>
        ))
      )}
    </Grid>
  );
};

export default MazeNode;
