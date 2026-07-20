import type { ReactNode, MouseEventHandler } from "react";

interface ButtonChildrenProps {
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const ButtonChildren = ({
  children,
  type = "button",
  onClick,
}: ButtonChildrenProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className=" w-2/3 cursor-pointer md:w-36 lg:w-48 rounded-xl bg-[#111111] h-10 text-white font-bold hover:bg-gray-400 "
    >
      {children}
    </button>
  );
};

export default ButtonChildren;
