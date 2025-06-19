import { useState } from "react";
import { Card } from "@/app/common/types";
import EntryInputGroup from "../molecules/EntryInputGroup";
import EntryList from "../molecules/EntryList";

interface MonthCardProps {
  cardData: Card;
  onAddIncome: (id: string, name: string, value: number) => void;
  onAddExpense: (
    cardId: string,
    newExpName: string,
    newExpValue: number
  ) => void;
}
const MonthCard = ({ cardData, onAddIncome, onAddExpense }: MonthCardProps) => {
  const { id, name, incomes, expenses }: Card = cardData;

  const [newExpName, setNewExpName] = useState("");
  const [newExpValue, setNewExpValue] = useState(0);

  const [newIncName, setNewIncName] = useState("");
  const [newIncValue, setNewIncValue] = useState(0);

  const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);
  const savings = expenses.reduce((s, e) => s + e.amount, 0) - totalExpenses;

  const color =
    totalExpenses > savings
      ? "bg-red-500 text-white"
      : totalExpenses < savings
        ? "bg-green-400 text-white"
        : "bg-gray-100";

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow h-fit">
      {/* Card title*/}
      <div className={`${color} rounded-t-2xl p-4`}>
        <span className="text-xl font-semibold">{name}</span>
      </div>

      <div className="flex flex-col gap-y-2 p-6 ">
        <EntryList title="Icomes" entries={incomes} />
        <EntryInputGroup
          id={id}
          name={newIncName}
          amount={newIncValue}
          onChangeName={setNewIncName}
          onChangeAmount={setNewIncValue}
          onAdd={onAddIncome}
        />

        <EntryList title="Expenses" entries={expenses} />
        <EntryInputGroup
          id={id}
          name={newExpName}
          amount={newExpValue}
          onChangeName={setNewExpName}
          onChangeAmount={setNewExpValue}
          onAdd={onAddExpense}
        />

        {/* Total */}
        <div className="border-t pt-2 mt-2 text-sm">
          <p>Total Expenses: €{totalExpenses.toFixed(2)}</p>
          <p>Savings: €{savings.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default MonthCard;
