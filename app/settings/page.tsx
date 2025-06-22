"use client";
import { useCallback, useEffect, useState } from "react";
import { CardStatus, DefaultItem, Entry } from "../common/types";
import MonthCard from "../components/organisms/MonthCard";
import BaseAppTemplate from "../components/templates/BaseAppTemplate";

const SettingsPage = () => {
  const [defaultItems, setDefaultItems] = useState<DefaultItem[]>([]);
  const [isEditting, setIsEditting] = useState(false);

  const fetchAndTransform = useCallback(async () => {
    const res = await fetch("/api/default-items");
    const items: DefaultItem[] = await res.json();
    setDefaultItems(items);
  }, []);

  // Get default items
  useEffect(() => {
    fetchAndTransform();
  }, []);

  const onSave = async (
    id: string,
    newIncomeList: Entry[],
    newExpList: Entry[]
  ) => {
    const board_id = defaultItems[0].board_id;

    try {
      await fetch(`/api/default-items/${board_id}`, {
        method: "DELETE",
      });

      const allItems = [...newIncomeList, ...newExpList].map((item) => ({
        name: item.name,
        amount: item.amount,
        type: newIncomeList.includes(item) ? "income" : "expense",
        board_id,
      }));

      // 3. Insert new default_items
      const res = await fetch("/api/default-items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(allItems),
      });

      if (!res.ok) return;

      fetchAndTransform();
      setIsEditting(false);
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  return (
    <BaseAppTemplate>
      <div className="w-full px-40 py-5">
        <div className="p-4 flex justify-between items-center mb-4 font-bold text-3xl/10">
          <span>Settings</span>
        </div>

        <div className="w-1/3">
          <MonthCard
            cardData={{
              id: "settings",
              name: "Default Values",
              incomes: defaultItems.filter((item) => item.type === "income"),
              expenses: defaultItems.filter((item) => item.type === "expense"),
            }}
            key={"settings"}
            onDelete={() => {}}
            onEdit={() => setIsEditting(true)}
            deletable={false}
            onSave={onSave}
            status={isEditting ? CardStatus.editting : CardStatus.reading}
          />
        </div>
      </div>
    </BaseAppTemplate>
  );
};

export default SettingsPage;
