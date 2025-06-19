"use client";

import { useState } from "react";
import { FileCog } from "lucide-react";
import InputWithButton from "./components/molecules/InputWithButton";
import IconButton from "./components/atoms/IconButton";
import MonthCard from "./components/organisms/MonthCard";
import { Card } from "./common/types";

const defaultIncome = [
  { name: "Salary 1", amount: 2900 },
  { name: "Salary 2", amount: 4000 },
];
const defaultExpenses = [
  { name: "Exp1", amount: 1000 },
  { name: "Exp2", amount: 100 },
  { name: "Exp3", amount: 600 },
];
export default function Home() {
  const [cards, setCards] = useState<Card[]>([]);
  const [newMonthName, setNewMonthName] = useState("");

  const createCard = () => {
    if (!newMonthName) return;
    const newCard: Card = {
      id: crypto.randomUUID(),
      name: newMonthName,
      incomes: defaultIncome,
      expenses: defaultExpenses,
    };
    setCards([...cards, newCard]);
    setNewMonthName("");
  };

  return (
    <div className="w-full p-10">
      {/* Page Title */}
      <div className="w-full flex justify-center  text-2xl">
        <span>Monthly Finance Dashboard</span>
      </div>

      {/* Action buttons */}
      <div className=" w-full flex justify-end mt-2 gap-2 mb-6">
        <InputWithButton
          placeholder="Month"
          buttonText="Add"
          value={newMonthName}
          onChange={(e) => setNewMonthName(e.target.value)}
          onClick={createCard}
        />
        <IconButton
          icon={<FileCog />}
          onClick={() => console.log("to be implemented")}
        />
      </div>

      {/* Cards grid*/}
      <div className="grid gap-6 md:grid-cols-3">
        {cards.map((card) => {
          return (
            <MonthCard
              cardData={card}
              key={card.id}
              onAddIncome={() => {}}
              onAddExpense={() => {}}
            />
          );
        })}
      </div>
    </div>
  );
}
