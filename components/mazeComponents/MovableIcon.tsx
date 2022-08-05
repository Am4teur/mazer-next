import { chakra } from "@chakra-ui/react";
import { isValidMotionProp, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { fromEvent } from "rxjs";
import Pokemon from "./Pokemon";

const DEFAULT_STEP_SIZE = 64;

interface IMovableIcon {
  startX?: number;
  startY?: number;
  stepSize?: number;
  h?: number;
  w?: number;
  iconId: number;
  publish: number;
}

const MotionBox = chakra(motion.div, {
  /**
   * Allow motion props and the children prop to be forwarded.
   * All other chakra props not matching the motion props will still be forwarded.
   */
  shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === "children",
});

const MovableIcon = ({
  startX = 0,
  startY = 0,
  stepSize = DEFAULT_STEP_SIZE,
  h = 64,
  w = 64,
  iconId,
  publish,
}: IMovableIcon) => {
  const [posX, setPosX] = useState(startX);
  const [posY, setPosY] = useState(startY);

  useEffect(() => {
    const handleKeyDown = (e: any) => {
      const { key } = e;
      switch (key) {
        case "ArrowLeft":
        case "a":
          setPosX((prevX) => prevX - stepSize);
          break;
        case "ArrowUp":
        case "w":
          setPosY((prevY) => prevY - stepSize);
          break;
        case "ArrowRight":
        case "d":
          setPosX((prevX) => prevX + stepSize);
          break;
        case "ArrowDown":
        case "s":
          setPosY((prevY) => prevY + stepSize);
          break;
        default:
          break;
      }
    };

    var ev = fromEvent(document, "keydown").subscribe(handleKeyDown);

    return () => {
      ev.unsubscribe();
    };
  }, [setPosX, setPosY, stepSize]);

  return (
    <MotionBox
      h={`${h}px`}
      w={`${w}px`}
      zIndex={10}
      position="absolute"
      animate={{ x: posX, y: posY }}
      transition={{ type: "tween" }}
    >
      <Pokemon h={h} w={w} pokemonId={iconId} />
    </MotionBox>
  );
};

export default MovableIcon;
