interface BoxProps {
  value: number;
  title: string;
}

const Box = ({ value, title }: BoxProps) => {
  return (
    <div className="rounded-xl p-6 shadow-sm border border-gray-200 w-full max-w-xs text-center bg-[#F5F8FB]">
      <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
        {title}
      </p>
      <p className="text-2xl font-bold mt-1 text-[#1C2A3A]">
        {value.toLocaleString("en-IE", {
          style: "currency",
          currency: "EUR",
        })}
      </p>
    </div>
  );
};

export default Box;
