import { generateMaze, Node } from "@/objects/mazeUtils";
import { useChannel } from "@ably-labs/react-hooks";
import { Box } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { IPlayer } from "player";
import { useCallback, useEffect, useMemo, useState } from "react";
import { fromEvent } from "rxjs";
import MazeGrid from "./MazerGrid";
import MovableIcon from "./MovableIcon";
import OfflinePlayers from "./OfflinePlayers";
import OnlinePlayers from "./OnlinePlayers";

const MazeBoard = ({ maze }: any) => {
  /*
   * Map's info
   * Map's can be iterable and are organized
   * Map's support non string keys, whereas objects only support string keys
   *  (this actually is good to know but I do not intend to use it in players)
   * Map's size is easy with myMap.size, whereas with objects you ned to do a loop
   * Map's has myMap.has(key), whereas objects I can do the same via myObj[key] ? hasKey : notHasKey
   * Map's has myMap.get(key), whereas objects myObj[key]
   * const myMap = new Map<string, {id: number, something: string}>([
   *   ["userId1": {id: 1, something: "yea1"}],
   *   ["userId2": {id: 2, something: "yea2"}],
   * ])
   * Map's has myMap.set("userId1": {id: 1, something: "yea1"}), whereas objects myObj[key]
   * Map's can also be ...myMap
   */
  const [players, setPlayers] = useState<Map<string, IPlayer>>(maze.players);
  const { data: session } = useSession();
  // @TODO remove this ts ignore, when we login with email, we need to get the _id
  // @ts-ignore
  const userId = session?.user.id || session?.user._id || "";

  const generatedMazeGrid = useMemo(
    () => generateMaze(maze.mazeSeed, maze.cols, maze.rows),
    [maze]
  );

  const updatePlayer = useCallback(
    (player: IPlayer) => {
      setPlayers((prevPlayers) => {
        const { userId, x, y } = player;
        const newPlayers = new Map<string, IPlayer>(prevPlayers);
        newPlayers.set(userId, {
          ...prevPlayers.get(userId)!,
          x,
          y,
        });
        return newPlayers;
      });
    },
    [setPlayers]
  );

  const [channel, ably] = useChannel("maze:<mazeId>", (message: any) => {
    receiveMessage(message);
  });

  const publish = useCallback(async (updatedPlayer: IPlayer) => {
    // @TODO remove hardcoded global mazeId
    const mazeId = "62ea92934373151e62bee566";

    fetch(`api/maze/updatePlayer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mazeId: mazeId,
        player: updatedPlayer,
      }),
    });

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

  const canMove = useCallback(
    (direction: string, player: IPlayer) => {
      type NodeKey = keyof Node;

      const directionsMap: { [key: string]: string } = {
        ArrowUp: "N",
        w: "N",
        ArrowRight: "E",
        d: "E",
        ArrowDown: "S",
        s: "S",
        ArrowLeft: "W",
        a: "W",
      };

      return generatedMazeGrid[player.y][player.x][
        directionsMap[direction] as NodeKey
      ];
    },
    [generatedMazeGrid]
  );

  useEffect(() => {
    const player = players.get(userId);

    if (!player) {
      // TODO implement new player
      return;
    }

    const handleKeyDown = (e: any) => {
      e.preventDefault();

      const updatedPlayer = { ...player };

      if (canMove(e.key, player)) {
        switch (e.key) {
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
          case "ArrowLeft":
          case "a":
            updatedPlayer.x -= 1;
            break;
          default:
            break;
        }

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
  }, [publish, userId, players, updatePlayer, canMove]);

  const playersIconRefs: JSX.Element[] = [];
  players.forEach((player: IPlayer) => {
    playersIconRefs.push(<MovableIcon key={player.userId} player={player} />);
  });

  return (
    <Box display="flex" gap="8">
      <Box className="colOne">
        <Box rounded="lg" overflow="hidden">
          {playersIconRefs}
          <MazeGrid generatedMazeGrid={generatedMazeGrid} />
        </Box>
      </Box>
      <Box className="colTwo">
        <OnlinePlayers />
        <OfflinePlayers players={players} />
      </Box>
    </Box>
  );
};

export default MazeBoard;
