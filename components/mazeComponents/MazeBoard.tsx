import { useChannel } from "@ably-labs/react-hooks";
import { Box, Heading } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { IPlayer } from "player";
import { useRef, useState } from "react";
import MazeGrid from "./MazerGrid";
import OfflinePlayers from "./OfflinePlayers";
import OnlinePlayers from "./OnlinePlayers";

interface IMazeBoard {
  children: JSX.Element;
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

const MazeBoard = ({ maze }: any) => {
  const playersRef = useRef(maze.players);
  // @TODO players should be a Map and not an object
  // Map's can be iterable and are organized
  // Map's support non string keys, whereas objects only support string keys
  //  (this actually is good to know but I do not intend to use it in players)
  // Map's size is easy with myMap.size, whereas with objects you ned to do a loop
  // Map's has myMap.has(key), whereas objects I can do the same via myObj[key] ? hasKey : notHasKey
  // Map's has myMap.get(key), whereas objects myObj[key]
  // const myMap = new Map<string, {id: number, something: string}>([
  //   ["userId1": {id: 1, something: "yea1"}],
  //   ["userId2": {id: 2, something: "yea2"}],
  // ])
  // Map's has myMap.set("userId1": {id: 1, something: "yea1"}), whereas objects myObj[key]
  // Map's can also be ...myMap
  const [players, setPlayers] = useState(playersRef.current);
  const { data: session } = useSession();
  // @TODO remove this ts ignore, when we login with email, we need to get the _id
  // @ts-ignore
  const userId = session?.user.id || session?.user._id || "";

  const [channel, ably] = useChannel("maze:<mazeId>", (message: any) => {
    receiveMessage(message);
  });

  const publish = async (updatedPlayer: IPlayer) => {
    // @TODO remove hardcoded global mazeId
    const mazeId = "62ea92934373151e62bee566";

    // fetch(`api/maze/updatePlayer`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     mazeId: mazeId,
    //     userId: userId,
    //     x: x,
    //     y: y,
    //     // player: updatedPlayer, TODO
    //   }),
    // });

    await fetch("/api/publish", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mazeId: mazeId,
        updatedPlayer,
      }),
    });
  };

  const receiveMessage = (message: any) => {
    const {
      data: {
        updatedPlayer: { userId: updatedPlayerId, prevX, prevY, x, y },
      },
    } = message;

    if (updatedPlayerId === userId) {
      return;
    }

    const newPlayers = { ...players };
    newPlayers[updatedPlayerId] = {
      ...newPlayers[updatedPlayerId],
      prevX,
      prevY,
      x,
      y,
    };

    setPlayers(newPlayers);
  };

  return (
    <Box display="flex" gap="4rem">
      <Box display="flex" flexDirection="column" alignItems="center">
        <Heading>Game</Heading>
        <MazeBackground>
          <MazeGrid players={players} publish={publish}></MazeGrid>
        </MazeBackground>
      </Box>
      <Box>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Heading>Online Players</Heading>
        </Box>
        <OnlinePlayers />
        <Box display="flex" flexDirection="column" alignItems="center">
          <Heading>Online Players</Heading>
        </Box>
        <OfflinePlayers players={playersRef.current} />
      </Box>
    </Box>
  );
};

export default MazeBoard;
