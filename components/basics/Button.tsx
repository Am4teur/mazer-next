import React from "react";
import { motion } from "framer-motion";

interface IButtonProps {
  children: React.ReactNode;
}

const Button = ({ children }: IButtonProps) => {
  return (
    <motion.button
      className="border-solid border-2 bg-blue-3 rounded-lg px-4 my-2"
      whileTap={{ y: 2 }}
      whileHover={{ scale: 1.1 }}
    >
      {children}
    </motion.button>
  );
};

export default Button;
