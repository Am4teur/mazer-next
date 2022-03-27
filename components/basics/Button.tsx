import React from "react";

interface IButtonProps {
  children: React.ReactNode;
}

const Button = ({ children }: IButtonProps) => {
  return (
    <button className="border-solid border-2 border-sky-800 bg-sky-500 rounded-lg px-4 my-2">
      {children}
    </button>
  );
};

export default Button;
