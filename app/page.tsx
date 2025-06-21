"use client";

import { useMemo, useState } from "react";
import InputWithButton from "./components/molecules/InputWithButton";
import MonthCard from "./components/organisms/MonthCard";
import { Card, CardStatus, Entry } from "./common/types";
import { useRouter } from "next/navigation";
import { useDefaults } from "./context/DefaultContext";
import { useCards } from "./context/CardsContext";

export default function Home() {
  const router = useRouter();
  const { defaultEntries } = useDefaults();
  const { cards, setCards } = useCards();

  const [recordName, setNewMonthName] = useState("");
  const [edittingCard, setEdittingCard] = useState<string | null>(null);

  const currentMonth = useMemo(
    () =>
      new Date().toLocaleString("default", {
        month: "long",
        year: "numeric",
      }),
    []
  );

  const createCard = () => {
    const name = recordName === "" ? currentMonth : recordName;
    const newCard: Card = {
      id: crypto.randomUUID(),
      name: name,
      incomes: defaultEntries.incomes,
      expenses: defaultEntries.expenses,
    };
    setCards([...cards, newCard]);
    setNewMonthName("");
    setEdittingCard(newCard.id);
  };

  const deleteCard = (id: string) => {
    setCards(cards.filter((card) => card.id !== id));
  };

  const onEdit = (id: string) => {
    setEdittingCard(id);
  };

  const onSave = (id: string, newIncomeList: Entry[], newExpList: Entry[]) => {
    const outdatedCard = cards.find((card) => card.id === id);
    if (!outdatedCard) {
      return console.log(
        "ERROR: Trying to delete a non-existing item _ test commit"
      );
    }

    const updatedCard: Card = {
      ...outdatedCard,
      incomes: newIncomeList,
      expenses: newExpList,
    };

    setCards(cards.map((card) => (card.id === id ? updatedCard : card)));
    setEdittingCard(null);
  };

  return (
    <div className="w-full px-40 py-5">
      <div className="p-4 flex justify-between items-center mb-4">
        <span className=" font-bold text-3xl/10">Finanancial Overview</span>
        <InputWithButton
          placeholder="Period"
          buttonText="Add"
          value={recordName}
          onChange={(e) => setNewMonthName(e.target.value)}
          onClick={createCard}
        />
      </div>

      {/* Cards grid*/}
      <div className="grid gap-6 md:grid-cols-2 sm:grid-cols-1">
        {cards.map((card) => (
          <MonthCard
            cardData={card}
            key={card.id}
            onDelete={deleteCard}
            onEdit={onEdit}
            onSave={onSave}
            status={
              card.id === edittingCard
                ? CardStatus.editting
                : CardStatus.reading
            }
          />
        ))}
      </div>
    </div>
  );
}
