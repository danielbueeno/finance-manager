"use client";

import { Board, Card, CardStatus, Entry, Period } from "@/app/common/types";
import { useEffect, useMemo, useState } from "react";
import InputWithButton from "../molecules/InputWithButton";
import MonthCard from "./MonthCard";
import { periodsToCards, periodToCard } from "@/app/common/helperFuntions";

export default function FinancialOverview() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [periodName, setPeriodName] = useState("");

  const [cards, setCards] = useState<Card[]>([]);
  const [edittingCard, setEdittingCard] = useState<string | null>(null);

  // Get boards - in reality the current implementation only allows one board per user
  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const res = await fetch("/api/boards");
        if (!res.ok) return;

        const data = await res.json();
        setBoards(data);
      } catch (err) {
        console.error("Error fetching boards:", err);
      }
    };
    fetchBoards();
  }, []);

  // Get periods and parse it to board cards - can be improved to avoid this parse and use Period directly
  useEffect(() => {
    const fetchAndTransform = async () => {
      const res = await fetch("/api/periods");
      const periods: Period[] = await res.json();
      const cards = periodsToCards(periods);
      setCards(cards);
    };

    fetchAndTransform();
  }, []);

  const currentMonth = useMemo(
    () =>
      new Date().toLocaleString("default", {
        month: "long",
        year: "numeric",
      }),
    []
  );

  const createPeriod = async () => {
    const name = periodName === "" ? currentMonth : periodName;

    // Parse month and year from name
    const [monthName, year] = name.split(" ");
    const monthIndex = new Date(`${monthName} 1, ${year}`).getMonth(); // 0-based

    // Get start and end dates for that month
    const start = new Date(parseInt(year), monthIndex, 1);
    const end = new Date(parseInt(year), monthIndex + 1, 0); // Last day of month

    const period = {
      board_id: boards[0].id,
      name,
      start_date: start.toISOString().split("T")[0], // YYYY-MM-DD
      end_date: end.toISOString().split("T")[0],
    };

    try {
      const res = await fetch("/api/periods", {
        method: "POST",
        body: JSON.stringify(period),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const error = await res.json();
        console.error("Error creating period:", error);
        return;
      }

      const data = await res.json();
      const card = periodToCard(data);
      setCards([...cards, card]);
      setPeriodName("");
      setEdittingCard(card.id);
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  const deleteCard = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this period?");
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/periods/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) return;

      setCards((prev) => prev.filter((card) => card.id !== id));
    } catch (err) {
      console.error("Error deleting period:", err);
    }
  };

  const onEdit = (id: string) => {
    setEdittingCard(id);
  };

  const onSave = async (
    id: string,
    newIncomeList: Entry[],
    newExpList: Entry[]
  ) => {
    const outdatedCard = cards.find((card) => card.id === id);
    if (!outdatedCard) {
      return console.log("ERROR: Trying to save a non-existing card");
    }

    // 1. Build the updated card for local state
    const updatedCard: Card = {
      ...outdatedCard,
      incomes: newIncomeList,
      expenses: newExpList,
    };

    // 2. Persist the update to the backend
    try {
      const res = await fetch(`/api/periods/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: outdatedCard.name,
          start_date: "", // fill in if needed
          end_date: "", // fill in if needed
          incomes: newIncomeList.map((item) => ({
            ...item,
            type: "income",
          })),
          expenses: newExpList.map((item) => ({
            ...item,
            type: "expense",
          })),
        }),
      });

      if (!res.ok) return;

      setCards(cards.map((card) => (card.id === id ? updatedCard : card)));
      setEdittingCard(null);
    } catch (err) {
      console.error("Unexpected error while saving:", err);
    }
  };

  return (
    <div className="w-full px-40 py-5">
      <div className="p-4 flex justify-between items-center mb-4">
        <span className=" font-bold text-3xl/10">Financial Overview</span>
        <InputWithButton
          placeholder="Month Year"
          buttonText="Add"
          value={periodName}
          onChange={(e) => setPeriodName(e.target.value)}
          onClick={createPeriod}
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
