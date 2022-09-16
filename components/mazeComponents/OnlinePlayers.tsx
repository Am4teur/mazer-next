import { assertConfiguration, usePresence } from "@ably-labs/react-hooks";
import { Box } from "@chakra-ui/react";

const OnlinePlayers = () => {
  const ablyClient = assertConfiguration();
  const [presenceData] = usePresence("maze:<mazeId>");

  const OnlinePlayersList = presenceData.map((player, index) => {
    const isItMe = player.clientId === ablyClient.auth.clientId ? "(me)" : "";

    return (
      <li key={index}>
        <span>{player.clientId}</span>
        <span>{isItMe}</span>
      </li>
    );
  });

  return (
    <Box backgroundColor={"#00ddff4a"} rounded="md" padding="1rem">
      <ul>{OnlinePlayersList}</ul>
    </Box>
  );
};

export default OnlinePlayers;
