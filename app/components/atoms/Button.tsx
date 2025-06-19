interface ButtonProps {
  text: string;
  onClick: () => void;
  className?: string;
}

const Button = ({ text, onClick, className }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${className ?? "bg-blue-600 text-white px-4 py-2 rounded"} cursor-pointer font-medium`}
    >
      {text}
    </button>
  );
};

export default Button;
