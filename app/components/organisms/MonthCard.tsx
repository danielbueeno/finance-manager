import { useState } from "react";
import { Card, CardStatus, Entry } from "@/app/common/types";
import EntryInputGroup from "../molecules/EntryInputGroup";
import EntryList from "../molecules/EntryList";
import CardHeader from "../molecules/CardHeader";

interface MonthCardProps {
  cardData: Card;
  status: CardStatus;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onSave: (id: string, newIncomeList: Entry[], newExpList: Entry[]) => void;
  onCancel: (id: string) => void;
}

const MonthCard = ({
  cardData,
  status,
  onDelete,
  onSave,
  onCancel,
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
  const savings =
    newIncomeList.reduce((s, e) => s + e.amount, 0) - totalExpenses;
  const headerColor =
    totalExpenses > savings
      ? "bg-red-500 text-white"
      : totalExpenses < savings
        ? "bg-green-400 text-white"
        : "bg-gray-100";

  const clear = () => {
    setNewExpName("");
    setNewExpValue(0);
    setNewIncName("");
    setNewIncValue(0);
    setNewIncomeList(incomes);
    onCancel(id);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow h-fit">
      <CardHeader
        name={name}
        id={id}
        color={headerColor}
        status={status}
        onDelete={onDelete}
        onEdit={onEdit}
        onCancel={clear}
        onSave={() => onSave(id, newIncomeList, newExpList)}
      />

      <div className="flex flex-col gap-y-2 p-6 ">
        <EntryList
          title="Icomes"
          entries={newIncomeList}
          onDelete={onDeleteIncome}
          status={status}
        />
        {status === CardStatus.editting && (
          <EntryInputGroup
            id={id}
            name={newIncName}
            amount={newIncValue}
            onChangeName={setNewIncName}
            onChangeAmount={setNewIncValue}
            onAdd={onAddIncome}
          />
        )}

        <EntryList
          title="Expenses"
          entries={newExpList}
          onDelete={onDeleteExpense}
          status={status}
        />

        {status === CardStatus.editting && (
          <EntryInputGroup
            id={id}
            name={newExpName}
            amount={newExpValue}
            onChangeName={setNewExpName}
            onChangeAmount={setNewExpValue}
            onAdd={onAddExpense}
          />
        )}

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
