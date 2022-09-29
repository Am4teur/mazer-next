import { Box, Heading, Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { IPlayer } from "player";
import Pokemon from "./Pokemon";

interface OfflinePlayersProps {
  players: Map<string, IPlayer>;
}

const OnlinePlayers = ({ players }: OfflinePlayersProps) => {
  const { data: session } = useSession();
  // @TODO remove this ts ignore, when we login with email, we need to get the _id
  // @ts-ignore
  const userId = session?.user.id || session?.user._id || "";

  const offlinePlayersList: JSX.Element[] = [];
  players.forEach((player: IPlayer) => {
    offlinePlayersList.push(
      <Box
        key={player.userId}
        display="flex"
        flexDirection="row"
        backgroundColor={"teal.200"}
        rounded="sm"
      >
        <Box h={12} w={12} mx="2">
          <Pokemon
            key={player.userId}
            pokemonId={player.iconId}
            h={48}
            w={48}
          />
        </Box>

        <Box display="flex" flexDirection="column">
          <Text display="flex" flexDirection="row">
            <Text fontWeight="bold">ID:&nbsp;</Text>
            <Text> {player.userId}</Text>
          </Text>
          <Text display="flex" flexDirection="row">
            <Text fontWeight="bold">Username:&nbsp;</Text>
            {player.userId === userId ? <Text>(me)&nbsp;</Text> : null}
            {player.username}
          </Text>
        </Box>
      </Box>
    );
  });

  return (
    <Box mb="8">
      <Heading textAlign="center" mb="4">
        Offline Players
      </Heading>
      <Box
        display="flex"
        gap="0.5rem"
        flexDirection="column"
        backgroundColor={"#00ddff4a"}
        rounded="md"
        padding="1rem"
      >
        {offlinePlayersList}
      </Box>
    </Box>
  );
};

export default OnlinePlayers;
