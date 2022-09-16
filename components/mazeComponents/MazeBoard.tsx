import { useChannel } from "@ably-labs/react-hooks";
import { Box, Heading } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { IPlayer } from "player";
import { useCallback, useEffect, useState } from "react";
import { fromEvent } from "rxjs";
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
  const [players, setPlayers] = useState<Map<string, IPlayer>>(maze.players);
  const { data: session } = useSession();
  // @TODO remove this ts ignore, when we login with email, we need to get the _id
  // @ts-ignore
  const userId = session?.user.id || session?.user._id || "";

  const updatePlayer = useCallback(
    (player: IPlayer) => {
      const { userId, x, y } = player;
      const newPlayers = new Map<string, IPlayer>(players);
      newPlayers.set(userId, {
        ...players.get(userId)!,
        x,
        y,
      });

      setPlayers(newPlayers);
    },
    [players]
  );

  const [channel, ably] = useChannel("maze:<mazeId>", (message: any) => {
    receiveMessage(message);
  });

  const publish = useCallback(async (updatedPlayer: IPlayer) => {
    // @TODO remove hardcoded global mazeId
    const mazeId = "62ea92934373151e62bee566";

    // fetch(`api/maze/updatePlayer`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     mazeId: mazeId,
    //     player: updatedPlayer,
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
  }, []);

  const receiveMessage = (message: any) => {
    let {
      data: { updatedPlayer },
    }: {
      data: {
        updatedPlayer: IPlayer;
      };
    } = message;

    if (updatedPlayer.userId === userId) {
      return;
    }

    updatePlayer(updatedPlayer);
  };

  useEffect(() => {
    const player = players.get(userId);

    if (!player) {
      // TODO implement new player
      return;
    }

    const handleKeyDown = (e: any) => {
      e.preventDefault();

      const updatedPlayer = { ...player };

      switch (e.key) {
        case "ArrowLeft":
        case "a":
          updatedPlayer.x -= 1;
          break;
        case "ArrowUp":
        case "w":
          updatedPlayer.y -= 1;
          break;
        case "ArrowRight":
        case "d":
          updatedPlayer.x += 1;
          break;
        case "ArrowDown":
        case "s":
          updatedPlayer.y += 1;
          break;
        default:
          break;
      }

      if (updatedPlayer.x !== player.x || updatedPlayer.y !== player.y) {
        publish(updatedPlayer);
        updatePlayer(updatedPlayer);
      }
    };

    var eventsSubscription = fromEvent(document, "keydown").subscribe(
      handleKeyDown
    );

    return () => {
      eventsSubscription.unsubscribe();
    };
  }, [publish, userId, players, updatePlayer]);

  return (
    <Box display="flex" gap="4rem">
      <Box display="flex" flexDirection="column" alignItems="center">
        <Heading>Game</Heading>
        <MazeBackground>
          <MazeGrid players={players}></MazeGrid>
        </MazeBackground>
      </Box>
      <Box>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Heading>Online Players</Heading>
        </Box>
        <OnlinePlayers />
        <Box display="flex" flexDirection="column" alignItems="center">
          <Heading>Offline Players</Heading>
        </Box>
        <OfflinePlayers players={players} />
      </Box>
    </Box>
  );
};

export default MazeBoard;
