import { Box } from "@chakra-ui/react";
import Ably from "ably";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import MazeGrid from "./MazerGrid";

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

interface IMazeBoard {
  children: JSX.Element;
}

const MazeBoard = ({ maze }: any) => {
  const channel: any = useRef();
  const playersRef = useRef(maze.players);
  const [players, setPlayers] = useState(playersRef.current);
  const { data: session } = useSession();
  const userId = session?.user.id || "";

  //
  //
  //
  useEffect(() => {
    const ablyClient = new Ably.Realtime.Promise({
      authUrl: `/api/createTokenRequest?userId=${userId}`,
    });

    ablyClient.connection.on("connected", () => {
      // successfully connected to Ably, not a channel
      console.log("Connected to Ably!");
    });

    // get/connect to channel "mazer"
    channel.current = ablyClient.channels.get("maze:<mazeId>");

    // subscribe to channel named "maze123", to receive and send messages to the channel
    channel.current.subscribe("update-player", (message: any) => {
      receiveMessage(message);
    });

    channel.current.attach(() => {
      channel.current.presence.enter("maze:<mazeId>", () =>
        console.log("New guy")
      );
    });

    // call to get the presence data, which is the members (action, clientID, data, connectionId, ...)
    channel.current.presence.get((err: any, members: any) => {
      if (err) {
        return console.error("Error fetching presence data");
      }
      console.log(
        "There are " + members.length + " clients present on this channel"
      );
      var first = members[0];
      if (first) {
        console.log("The first member is " + first.clientId);
        console.log("and their data is " + first.data);
      }
    });

    // subscribe to channel with presence
    channel.current.presence.subscribe((presenceData: any) => {
      const { action, clientId } = presenceData;
      switch (action) {
        case "enter":
          userEnter(clientId);
          break;
        case "leave":
          userLeave(clientId);
          break;
        case "udpate":
        case "present":
          console.log(`${action} from clientId: ${clientId}`);
          break;
        default:
          console.log(`Unknown action: ${action} | from clientId: ${clientId}`);
          break;
      }

      channel.current.presence.get((err: any, members: any) => {
        console.log(
          "There are now " + members + " clients present on this channel"
        );
      });
    });

    return () => {
      channel.current.detach(() => console.log("Disconnected from Ably!"));
    };
  }, [userId]);

  const publish = (updatedPlayer: any) => {
    // @TODO remove hardcoded global mazeId
    const mazeId = "62ea92934373151e62bee566";
    channel.current.publish("update-player", updatedPlayer);

    const res = fetch(`api/maze/updatePlayer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mazeId: mazeId, player: updatedPlayer }),
    });
  };

  const userEnter = (clientId: string) => {
    console.log("New user " + clientId + " entered");
  };

  const userLeave = (clientId: string) => {
    console.log("User " + clientId + " Left");
  };

  const receiveMessage = (message: any) => {
    console.log("message.data: ", message.data);
  };
  //
  //
  //

  return (
    <>
      <MazeBackground>
        <MazeGrid players={players} publish={publish}></MazeGrid>
      </MazeBackground>
    </>
  );
};

export default MazeBoard;
