import React from "react";

interface IconButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
  className?: string;
}

const IconButton = ({ icon, onClick, className = "" }: IconButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={
        className
          ? className
          : `p-2 text-white cursor-pointer rounded bg-blue-600 transition `
      }
    >
      {icon}
    </button>
  );
};

export default IconButton;
