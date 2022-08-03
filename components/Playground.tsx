import MazeBoard from "@/components/mazeComponents/MazeBoard";
import Ably from "ably";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";

interface IPlayer {
  userId: string;
  username: string;
  x: number;
  y: number;
}

interface IUpdatePlayerMessage {
  message: string;
}

const Playground = ({ maze }: any) => {
  const channel: any = useRef();
  const { data: session } = useSession();
  const username = session?.user.username || "";

  // players
  // maze
  // playerRef

  useEffect(() => {
    const ablyClient = new Ably.Realtime.Promise({
      authUrl: `/api/createTokenRequest?${session?.user.id}`,
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
  }, [session]);

  const publish = () => {
    const player: IPlayer = {
      userId: username,
      username: username,
      x: 0,
      y: 0,
    };
    channel.current.publish("update-player", player);
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

  const getMazes = async () => {
    await axios
      .get(`${"/api/maze"}/`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then(async (res) => {
        console.log(res.data.mazes);
      })
      .catch((error) => {
        console.error("My error on maze.ts: " + error);
      });
  };

  return (
    <>
      <button onClick={publish}>publish</button>
      <button onClick={getMazes}>get mazes</button>
      <MazeBoard maze={maze} />
    </>
  );
};

export default Playground;
