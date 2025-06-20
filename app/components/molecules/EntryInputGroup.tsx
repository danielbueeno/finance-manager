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

const baseInputStyle = "border px-2 py-1 rounded ";

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
        className={`${baseInputStyle} flex-1`}
      />
      <Input
        placeHolder="Amount"
        value={String(amount)}
        onChange={(e) => onChangeAmount(Number(e.target.value))}
        className={`${baseInputStyle} w-1/4`}
        type="number"
      />
      <Button
        text={buttonText}
        disabled={!name || name === "" || amount <= 0}
        onClick={() => onAdd(id, name, amount)}
        className="bg-blue-600 text-white px-2 rounded w-1/6"
      />
    </div>
  );
};

export default EntryInputGroup;
