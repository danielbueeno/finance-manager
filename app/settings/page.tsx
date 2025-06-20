"use client";
import { useState } from "react";
import { CardStatus, Entry } from "../common/types";
import MonthCard from "../components/organisms/MonthCard";
import IconButton from "../components/atoms/IconButton";
import { CircleArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDefaults } from "../context/DefaultContext";

const SettingsPage = () => {
  const router = useRouter();
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
    <div className="w-full p-10 flex flex-col gap-y-2">
      <div className="w-full flex justify-center text-2xl">
        <IconButton
          icon={<CircleArrowLeft />}
          onClick={() => router.push("/")}
        />
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
          onCancel={() => setIsEditting(false)}
          onSave={onSave}
          status={isEditting ? CardStatus.editting : CardStatus.reading}
        />
      </div>
    </div>
  );
};

export default SettingsPage;
