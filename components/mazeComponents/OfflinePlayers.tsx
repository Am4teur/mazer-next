import { Box } from "@chakra-ui/react";
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
        flexDirection="column"
        backgroundColor={"gray"}
      >
        <Box h={16} w={16}>
          <Pokemon key={player.userId} pokemonId={player.iconId} />
        </Box>

        <span>{player.userId}</span>
        <span>{player.username}</span>
        {player.userId === userId ? <span>(me)</span> : null}
      </Box>
    );
  });

  return (
    <Box backgroundColor={"#00ddff4a"} rounded="md" padding="1rem">
      <Box display="flex" gap="0.5rem" flexDirection="column">
        {offlinePlayersList}
      </Box>
    </Box>
  );
};

export default OnlinePlayers;
