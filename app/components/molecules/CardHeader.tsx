import { FinanancialStatus } from "@/app/common/types";

interface CardHeaderProps {
  name: string;
  financialStatus?: FinanancialStatus;
}
const CardHeader = ({ name, financialStatus }: CardHeaderProps) => {
  return (
    <div
      className={`w-full rounded-t-2xl p-4 pb-2 flex justify-between items-center`}
    >
      <span className="text-xl text-[#1C2A3A] font-semibold">{name}</span>
      {financialStatus && (
        <div
          className={`${financialStatus === FinanancialStatus.good ? "bg-green-400" : financialStatus === FinanancialStatus.bad ? "bg-red-400" : ""} p-4 text-sm rounded-2xl`}
        ></div>
      )}
    </div>
  );
};

export default CardHeader;
