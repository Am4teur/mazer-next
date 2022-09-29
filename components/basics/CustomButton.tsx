import { motion } from "framer-motion";
import React from "react";

interface ICustomButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  ref?: React.Ref<HTMLButtonElement>;
  // href
}

const CustomButton = React.forwardRef(function helper(
  { children, onClick, ref }: ICustomButtonProps,
  _
) {
  return (
    <motion.button
      className="border-solid border-2 border-blue-3 bg-blue-3 rounded-lg shadow-lg shadow-slate-400 px-4 my-2 text-white"
      whileTap={{ y: 2 }}
      whileHover={{ scale: 1.1 }}
      onClick={onClick}
      ref={ref}
    >
      {children}
    </motion.button>
  );
});

export default CustomButton;
