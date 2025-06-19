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
        className="border px-3 py-2 rounded-l"
      />
      <Button
        text={buttonText}
        onClick={onClick}
        className="bg-blue-600 text-white px-4 py-2 rounded-r"
      />
    </div>
  );
};

export default InputWithButton;
