"use client";
import FinancialViewChart from "../components/organisms/FinancialViewChart";
import Box from "../components/atoms/Box";
import { useEffect, useMemo, useState } from "react";
import { formatCardDate, parseCardDate } from "../common/helperFuntions";
import BaseAppTemplate from "../components/templates/BaseAppTemplate";
import { DefaultItem, Period } from "../common/types";

const DashboardPage = () => {
  const [periods, setPeriods] = useState<Period[]>([]);
  const [defaultItems, setDefaultItems] = useState<DefaultItem[]>([]);

  useEffect(() => {
    const fetchAndTransform = async () => {
      const res = await fetch("/api/periods");
      const periods: Period[] = await res.json();
      setPeriods(periods);
    };

    fetchAndTransform();
  }, []);

  // Get default items
  useEffect(() => {
    const fetchAndTransform = async () => {
      const res = await fetch("/api/default-items");
      const items: DefaultItem[] = await res.json();
      setDefaultItems(items);
    };
    fetchAndTransform();
  }, []);

  const defaultEntries = useMemo(
    () => ({
      incomes: defaultItems.filter((item) => item.type === "income"),
      expenses: defaultItems.filter((item) => item.type === "expense"),
    }),
    [defaultItems]
  );

  // Sum of all savings from actual cards
  const totalCardSavings = useMemo(() => {
    return periods.reduce((sum, period) => {
      const income = period.items
        .filter((item) => item.type === "income")
        .reduce((acc, e) => acc + Number(e.amount), 0);
      const expenses = period.items
        .filter((item) => item.type === "expense")
        .reduce((acc, e) => acc + Number(e.amount), 0);
      return sum + (income - expenses);
    }, 0);
  }, [periods]);

  // Predicted savings over 12 months (mix of existing and default)
  const predictedSavings = useMemo(() => {
    if (!periods.length) return 0;

    const startDate = parseCardDate(periods[0].name);
    let total = 0;

    for (let i = 0; i < 12; i++) {
      const date = new Date(startDate);
      date.setMonth(startDate.getMonth() + i);
      const monthName = formatCardDate(date);
      const period = periods.find((c) => c.name === monthName);

      const incomes =
        period?.items.filter((item) => item.type === "income") ??
        defaultEntries.incomes;
      const expenses =
        period?.items.filter((item) => item.type === "expense") ??
        defaultEntries.expenses;

      const incomeSum = incomes.reduce((s, e) => s + Number(e.amount), 0);
      const expenseSum = expenses.reduce((s, e) => s + Number(e.amount), 0);
      total += incomeSum - expenseSum;
    }

    return total;
  }, [periods, defaultEntries]);

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
