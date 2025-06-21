import { useState } from "react";
import { Card, CardStatus, Entry, FinanancialStatus } from "@/app/common/types";
import EntryInputGroup from "../molecules/EntryInputGroup";
import EntryList from "../molecules/EntryList";
import CardHeader from "../molecules/CardHeader";

interface MonthCardProps {
  cardData: Card;
  status: CardStatus;
  deletable?: boolean;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onSave: (id: string, newIncomeList: Entry[], newExpList: Entry[]) => void;
}

const MonthCard = ({
  cardData,
  status,
  deletable = true,
  onDelete,
  onSave,
  onEdit,
}: MonthCardProps) => {
  const { id, name, incomes, expenses }: Card = cardData;

  // Income logic
  const [newIncName, setNewIncName] = useState("");
  const [newIncValue, setNewIncValue] = useState(0);
  const [newIncomeList, setNewIncomeList] = useState(incomes);

  const onAddIncome = () => {
    setNewIncomeList((prev) => [
      ...prev,
      { name: newIncName, amount: newIncValue, id: crypto.randomUUID() },
    ]);
    setNewIncValue(0);
    setNewIncName("");
  };

  const onDeleteIncome = (id: string) => {
    const filteredIcomes = newIncomeList.filter((entry) => entry.id !== id);
    setNewIncomeList(filteredIcomes);
  };

  // Expenses logic
  const [newExpName, setNewExpName] = useState("");
  const [newExpValue, setNewExpValue] = useState(0);
  const [newExpList, setNewExpList] = useState(expenses);

  const onAddExpense = () => {
    setNewExpList((prev) => [
      ...prev,
      { name: newExpName, amount: newExpValue, id: crypto.randomUUID() },
    ]);
    setNewExpValue(0);
    setNewExpName("");
  };

  const onDeleteExpense = (id: string) => {
    const filteredExpenses = newExpList.filter((entry) => entry.id !== id);
    setNewExpList(filteredExpenses);
  };

  // General logic
  const totalExpenses = newExpList.reduce((s, e) => s + e.amount, 0);
  const totalIncome = newIncomeList.reduce((s, e) => s + e.amount, 0);
  const savings =
    newIncomeList.reduce((s, e) => s + e.amount, 0) - totalExpenses;

  const financialStatus =
    totalExpenses > savings
      ? FinanancialStatus.bad
      : totalExpenses < savings
        ? FinanancialStatus.good
        : FinanancialStatus.controlled;

  return (
    <div className="bg-[#F5F8FB]  rounded-2xl shadow-md hover:shadow-lg transition-shadow h-fit">
      <CardHeader name={name} financialStatus={financialStatus} />

      <div className="flex flex-col gap-y-2 p-4 pt-0 ">
        <div className="mb-2 text-sm text-[#1C2A3A] font-medium flex gap-1">
          <span>Income: €{totalIncome.toFixed(2)}</span> |
          <span>Expenses: €{totalExpenses.toFixed(2)}</span> |
          <span>Savings: €{savings.toFixed(2)}</span>
        </div>

        <div className="self-end text-[#1C2A3A] flex gap-2">
          <span
            className="cursor-pointer underline"
            onClick={() =>
              status === CardStatus.reading
                ? onEdit(id)
                : onSave(id, newIncomeList, newExpList)
            }
          >
            {status === CardStatus.reading ? "Edit" : "Save"}
          </span>
          {deletable && (
            <span
              className="cursor-pointer underline"
              onClick={() => onDelete(id)}
            >
              Delete
            </span>
          )}
        </div>

        {status === CardStatus.editting && (
          <>
            <EntryList
              title="Icome"
              entries={newIncomeList}
              onDelete={onDeleteIncome}
              status={status}
            />
            <EntryInputGroup
              id={id}
              name={newIncName}
              amount={newIncValue}
              onChangeName={setNewIncName}
              onChangeAmount={setNewIncValue}
              onAdd={onAddIncome}
            />
            <EntryList
              title="Expenses"
              entries={newExpList}
              onDelete={onDeleteExpense}
              status={status}
            />
            <EntryInputGroup
              id={id}
              name={newExpName}
              amount={newExpValue}
              onChangeName={setNewExpName}
              onChangeAmount={setNewExpValue}
              onAdd={onAddExpense}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default MonthCard;
