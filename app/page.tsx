"use client";

import { useMemo, useState } from "react";
import { FileCog } from "lucide-react";
import InputWithButton from "./components/molecules/InputWithButton";
import IconButton from "./components/atoms/IconButton";
import MonthCard from "./components/organisms/MonthCard";
import { Card, CardStatus, Entry } from "./common/types";
import { useRouter } from "next/navigation";
import { useDefaults } from "./context/DefaultContext";
import { useCards } from "./context/CardsContext";

export default function Home() {
  const router = useRouter();
  const { defaultEntries } = useDefaults();
  const { cards, setCards } = useCards(); // ← Now using context

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

    setCards([...cards.filter((c) => c.id !== id), updatedCard]);
    setEdittingCard(null);
  };

  const onCancel = () => {
    setEdittingCard(null);
  };

  return (
    <div className="w-full p-10">
      {/* Page Title */}
      <div className="w-full flex justify-center  text-2xl">
        <span>Finance Board</span>
      </div>

      {/* Action buttons */}
      <div className=" w-full flex justify-end mt-2 gap-2 mb-6">
        <InputWithButton
          placeholder="Month"
          buttonText="Add"
          value={recordName}
          onChange={(e) => setNewMonthName(e.target.value)}
          onClick={createCard}
        />

        <IconButton
          icon={<FileCog />}
          onClick={() => router.push("/settings")}
        />
      </div>

      {/* Cards grid*/}
      <div className="grid gap-6 md:grid-cols-3">
        {cards.map((card) => (
          <MonthCard
            cardData={card}
            key={card.id}
            onDelete={deleteCard}
            onEdit={onEdit}
            onCancel={onCancel}
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
