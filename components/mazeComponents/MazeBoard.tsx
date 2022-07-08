import { Box } from "@chakra-ui/react";

interface IMazeBoard {
  nodes: string;
}

const MazeBackground = ({ children }: any) => (
  <Box
    display="flex"
    // flex="1 1 auto"
    justifyContent="center"
    alignItems="center"
    backgroundImage="url('/blue-bubbles.svg')"
    backgroundSize="cover"
    backgroundRepeat="no-repeat"
    backgroundPosition="center"
    backgroundAttachment="fixed"
    w="600px"
    h="600px"
    color="white"
  >
    {children}
  </Box>
);

const MazeBoard = () => {
  return <MazeBackground></MazeBackground>;
};

export default MazeBoard;
