"use client";
import { useState } from "react";
import { CardStatus, Entry } from "../common/types";
import MonthCard from "../components/organisms/MonthCard";
import { useDefaults } from "../context/DefaultContext";

const SettingsPage = () => {
  const { defaultEntries, setDefaultEntries } = useDefaults();
  const [isEditting, setIsEditting] = useState(false);

  const onSave = (id: string, newIncomeList: Entry[], newExpList: Entry[]) => {
    setDefaultEntries({
      ...defaultEntries,
      incomes: newIncomeList,
      expenses: newExpList,
    });
    setIsEditting(false);
  };

  return (
    <div className="w-full px-40 py-5">
      <div className="p-4 flex justify-between items-center mb-4 font-bold text-3xl/10">
        <span>Settings</span>
      </div>

      <div className="w-1/3">
        <MonthCard
          cardData={{
            id: "settings",
            name: "Default Values",
            incomes: defaultEntries.incomes,
            expenses: defaultEntries.expenses,
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
  );
};

export default SettingsPage;
