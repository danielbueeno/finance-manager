import Button from "../atoms/Button";
import Input from "../atoms/Input";

interface InputWithButtonProps {
  value: string;
  placeholder: string;
  buttonText: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
}

const InputWithButton = ({
  buttonText,
  value,
  placeholder,
  onChange,
  onClick,
}: InputWithButtonProps) => {
  return (
    <div className="flex">
      <Input
        placeHolder={placeholder}
        value={value}
        onChange={onChange}
        className="border border-[#B2C9E5] px-3 py-2 rounded-l focus:border-[#7A9DC5] focus:outline-none focus:ring-0"
      />
      <Button
        text={buttonText}
        onClick={onClick}
        className="bg-[#B2C9E5] px-4 py-2 rounded-r"
      />
    </div>
  );
};

export default InputWithButton;
