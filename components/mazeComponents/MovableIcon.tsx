import { chakra } from "@chakra-ui/react";
import { isValidMotionProp, motion } from "framer-motion";
import { IPlayer } from "player";
import Pokemon from "./Pokemon";

const DEFAULT_STEP_SIZE = 64;

interface IMovableIcon {
  stepSize?: number;
  h?: number;
  w?: number;
  player: IPlayer;
}

const MotionBox = chakra(motion.div, {
  // Allow motion props and the children prop to be forwarded.
  // All other chakra props not matching the motion props will still be forwarded.
  shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === "children",
});

const MovableIcon = ({
  stepSize = DEFAULT_STEP_SIZE,
  h = 64,
  w = 64,
  player,
}: IMovableIcon) => {
  const getPos = (pos: number) => {
    return pos * stepSize;
  };

  return (
    <MotionBox
      h={`${h}px`}
      w={`${w}px`}
      zIndex={10}
      position="absolute"
      initial={{ x: getPos(player.x), y: getPos(player.y) }}
      animate={{
        x: getPos(player.x),
        y: getPos(player.y),
      }}
      transition={{ type: "tween" }}
    >
      <Pokemon h={h} w={w} pokemonId={player.iconId} />
    </MotionBox>
  );
};

export default MovableIcon;
