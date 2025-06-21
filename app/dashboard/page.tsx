"use client";
import { useCards } from "../context/CardsContext";
import { useDefaults } from "../context/DefaultContext";
import FinancialViewChart from "../components/organisms/FinancialViewChart";
import Box from "../components/atoms/Box";
import { useMemo } from "react";
import { formatCardDate, parseCardDate } from "../common/helperFuntions";
import BaseAppTemplate from "../components/templates/BaseAppTemplate";

const DashboardPage = () => {
  const { defaultEntries } = useDefaults();
  const { cards } = useCards();

  // Sum of all savings from actual cards
  const totalCardSavings = useMemo(() => {
    return cards.reduce((sum, card) => {
      const income = card.incomes.reduce((acc, e) => acc + Number(e.amount), 0);
      const expenses = card.expenses.reduce(
        (acc, e) => acc + Number(e.amount),
        0
      );
      return sum + (income - expenses);
    }, 0);
  }, [cards]);

  // Predicted savings over 12 months (mix of existing and default)
  const predictedSavings = useMemo(() => {
    if (!cards.length) return 0;

    const startDate = parseCardDate(cards[0].name);
    let total = 0;

    for (let i = 0; i < 12; i++) {
      const date = new Date(startDate);
      date.setMonth(startDate.getMonth() + i);
      const monthName = formatCardDate(date);
      const card = cards.find((c) => c.name === monthName);

      const incomes = card?.incomes ?? defaultEntries.incomes;
      const expenses = card?.expenses ?? defaultEntries.expenses;

      const incomeSum = incomes.reduce((s, e) => s + Number(e.amount), 0);
      const expenseSum = expenses.reduce((s, e) => s + Number(e.amount), 0);
      total += incomeSum - expenseSum;
    }

    return total;
  }, [cards, defaultEntries]);

  return (
    <BaseAppTemplate>
      <div className="w-full px-40 py-5 gap-10 flex flex-col">
        <div className="p-4 flex justify-between items-center mb-4 font-bold text-3xl/10">
          <span>Dashboard view</span>
        </div>
        <div className="flex w-full justify-center gap-4">
          <Box value={totalCardSavings} title="Savings" />
          <Box value={predictedSavings} title="Predicted Savings" />
        </div>
        <FinancialViewChart />
      </div>
    </BaseAppTemplate>
  );
};

export default DashboardPage;
