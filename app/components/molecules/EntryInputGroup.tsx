import Button from "../atoms/Button";
import Input from "../atoms/Input";

interface EntryInputGroupProps {
  id: string;
  name: string;
  amount: number;
  onChangeName: (value: string) => void;
  onChangeAmount: (value: number) => void;
  onAdd: (id: string, name: string, amount: number) => void;
  buttonText?: string;
}

const baseInputStyle =
  "border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7A9DC5] px-3 py-2 rounded";

const EntryInputGroup = ({
  id,
  name,
  amount,
  onChangeName,
  onChangeAmount,
  onAdd,
  buttonText = "Add",
}: EntryInputGroupProps) => {
  return (
    <div className="flex flex gap-x-2">
      <Input
        placeHolder="Name"
        value={name}
        onChange={(e) => onChangeName(e.target.value)}
        className={`${baseInputStyle} w-1/2`}
      />
      <Input
        placeHolder="Amount"
        value={String(amount)}
        onChange={(e) => onChangeAmount(Number(e.target.value))}
        className={`${baseInputStyle} w-1/2`}
        type="number"
      />
      <Button
        text={buttonText}
        disabled={!name || name === "" || amount <= 0}
        onClick={() => onAdd(id, name, amount)}
        className="bg-[#B2C9E5] px-4 py-2 rounded"
      />
    </div>
  );
};

export default EntryInputGroup;
