interface ButtonProps {
  text: string;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

const Button = ({
  text,
  onClick,
  className,
  disabled = false,
}: ButtonProps) => {
  const disabledClasses = "bg-gray-400 text-white px-4 py-2 rounded";
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${disabled ? disabledClasses : (className ?? "bg-blue-600 text-white px-4 py-2 rounded")} cursor-pointer font-medium`}
    >
      {text}
    </button>
  );
};

export default Button;
