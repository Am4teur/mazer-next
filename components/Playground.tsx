import { useEffect, useRef } from "react";
import { Observable } from "rxjs";
import Ably from "ably";
import { useSession } from "next-auth/react";

interface IPlaygroundProps {
  isBoolean: boolean;
}

const Playground = ({ isBoolean }: IPlaygroundProps) => {
  let channel: any = useRef(); // useRef
  const { data: session } = useSession();

  useEffect(() => {
    const apiKey = "cGXDyw.jI8wvQ:E7ffJDCpfI_05hiC6iqWDcebOllI9o7Gm5J14nsPp2Q";
    const ably = new Ably.Realtime({
      key: apiKey,
      clientId: session?.user.username,
    }); // use authentication... still need to fully understand and investigate a bit more
    ably.connection.on("connected", () => {
      console.log("Connected to Ably!");
    });

    channel.current = ably.channels.get("mazer");
    channel.current.subscribe("greeting", (message: any) => {
      console.log(`Received a greeting message in realtime: ${message.data}`);
    });
    channel.current.attach(() => {
      channel.current.presence.enter("greeting", () => console.log("New guy"));
    });

    channel.current.presence.get((err: any, members: any) => {
      if (err) {
        return console.error("Error fetching presence data");
      }
      console.log(
        "There are " + members.length + " clients present on this channel"
      );
      var first = members[0];
      console.log("The first member is " + first.clientId);
      console.log("and their data is " + first.data);
    });

    channel.current.presence.subscribe((presenceMsg: any) => {
      console.log(
        "Received a " + presenceMsg.action + " from " + presenceMsg.clientId
      );
      channel.presence.get((err: any, members: any) => {
        console.log(
          "There are now " + members.length + " clients present on this channel"
        );
      });
    });

    return () => {
      channel.current.detach();
    };
  }, []);

  const publish = () => {
    channel.current.publish("greeting", `message random ${Math.random()}`);
  };

  return (
    <div>
      <button onClick={publish}>publish</button>
    </div>
  );
};

export default Playground;
