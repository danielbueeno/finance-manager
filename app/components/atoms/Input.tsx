interface InputProps {
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: React.HTMLInputTypeAttribute;
  label?: string;
  className?: string;
  placeHolder?: string;
}

const Input = ({
  value,
  label,
  onChange,
  type,
  className,
  placeHolder,
}: InputProps) => {
  return (
    <>
      {label && <label className="text-sm font-medium">{label}</label>}
      <input
        type={type ?? "text"}
        placeholder={placeHolder}
        value={value}
        onChange={onChange}
        className={className ?? "border px-3 py-2 rounded"}
      />
    </>
  );
};

export default Input;
