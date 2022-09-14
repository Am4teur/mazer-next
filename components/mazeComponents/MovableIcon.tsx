import { chakra } from "@chakra-ui/react";
import { isValidMotionProp, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { IPlayer } from "player";
import { useEffect } from "react";
import { fromEvent } from "rxjs";
import Pokemon from "./Pokemon";

const DEFAULT_STEP_SIZE = 64;

interface IMovableIcon {
  startX?: number;
  startY?: number;
  stepSize?: number;
  h?: number;
  w?: number;
  player: IPlayer;
  publish: (updatedPlayer: IPlayer) => {};
}

const MotionBox = chakra(motion.div, {
  /**
   * Allow motion props and the children prop to be forwarded.
   * All other chakra props not matching the motion props will still be forwarded.
   */
  shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === "children",
});

const MovableIcon = ({
  stepSize = DEFAULT_STEP_SIZE,
  h = 64,
  w = 64,
  player,
  publish,
}: IMovableIcon) => {
  const { data: session } = useSession();
  // @TODO remove this ts ignore, when we login with email, we need to get the _id
  // @ts-ignore
  const userId = session?.user.id || session?.user._id || "";

  useEffect(() => {
    const handleKeyDown = (e: any) => {
      e.preventDefault();

      let updatedPlayer = {
        ...player,
        prevX: player.x,
        prevY: player.y,
        x: player.x,
        y: player.y,
      };

      switch (e.key) {
        case "ArrowLeft":
        case "a":
          updatedPlayer = { ...updatedPlayer, x: player.x - 1 };
          break;
        case "ArrowUp":
        case "w":
          updatedPlayer = { ...updatedPlayer, y: player.y - 1 };
          break;
        case "ArrowRight":
        case "d":
          updatedPlayer = { ...updatedPlayer, x: player.x + 1 };
          break;
        case "ArrowDown":
        case "s":
          updatedPlayer = { ...updatedPlayer, y: player.y + 1 };
          break;
        default:
          break;
      }
      if (
        // only publish/update when player was really updated
        updatedPlayer.prevX !== updatedPlayer.x ||
        updatedPlayer.prevY !== updatedPlayer.y
      ) {
        publish(updatedPlayer);
      }
    };

    if (userId === player.userId) {
      var eventsSubscription = fromEvent(document, "keydown").subscribe(
        handleKeyDown
      );
    }

    return () => {
      if (userId === player.userId) {
        eventsSubscription.unsubscribe();
      }
    };
  }, [publish, player, userId]);

  const getInitialCoord = (prevPos: number, pos: number) => {
    return (prevPos - pos) * stepSize;
  };

  return (
    <MotionBox
      h={`${h}px`}
      w={`${w}px`}
      zIndex={10}
      position="absolute"
      initial={{
        x: getInitialCoord(player.prevX, player.x), // TODO test if the animation is the problem for the double key press (top and left for example)
        y: getInitialCoord(player.prevY, player.y),
      }}
      animate={{
        x: 0,
        y: 0,
      }}
      transition={{ type: "tween" }}
    >
      <Pokemon h={h} w={w} pokemonId={player.iconId} />
    </MotionBox>
  );
};

export default MovableIcon;
