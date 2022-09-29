import { assertConfiguration, usePresence } from "@ably-labs/react-hooks";
import { Box, Heading } from "@chakra-ui/react";

const OnlinePlayersList = ({ onlinePlayersList }: any) => (
  <Box backgroundColor={"#00ddff4a"} rounded="md" padding="1rem">
    <ul>{onlinePlayersList}</ul>
  </Box>
);

const OnlinePlayers = () => {
  const ablyClient = assertConfiguration();
  const [presenceData] = usePresence("maze:<mazeId>");

  const onlinePlayersList = presenceData.map((player, index) => {
    const isItMe = player.clientId === ablyClient.auth.clientId ? "(me)" : "";

    return (
      <li key={index}>
        <span>{player.clientId}</span>
        <span>{isItMe}</span>
      </li>
    );
  });

  return (
    <Box mb="8">
      <Heading textAlign="center" mb="4">
        Online Players
      </Heading>
      <OnlinePlayersList onlinePlayersList={onlinePlayersList} />
    </Box>
  );
};

export default OnlinePlayers;
