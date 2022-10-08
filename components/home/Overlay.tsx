import { motion } from "framer-motion";

const Overlay = () => {
  return (
    <motion.a
      whileHover={{
        opacity: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        transition: {
          duration: 0.3,
          type: "tween",
          ease: "easeIn",
        },
      }}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        opacity: 0,
        width: "384px",
        height: "384px",
        cursor: "pointer",
        color: "white",
        fontSize: "92px",

        zIndex: 11, // because of the MovableIcon
        overflow: "hidden",
        borderRadius: "0.5rem",
      }}
      href="/play"
    >
      Play
    </motion.a>
  );
};

export default Overlay;
