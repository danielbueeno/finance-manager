"use client";
import { useEffect, useMemo, useState } from "react";
import {
  LineChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Line,
  Legend,
  ResponsiveContainer,
} from "recharts";
import ChartTooltip from "../atoms/ChartTooltip";
import { formatCardDate, parseCardDate } from "@/app/common/helperFuntions";
import { DefaultItem, Period } from "@/app/common/types";

const FinancialViewChart = () => {
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

  const chartData = useMemo(() => {
    if (!periods.length) return [];

    const startDate = parseCardDate(periods[0].name);
    const result: {
      name: string;
      income: number;
      expenses: number;
      savings: number;
      isFuture: boolean;
    }[] = [];

    for (let i = 0; i < 12; i++) {
      const date = new Date(startDate);
      date.setMonth(startDate.getMonth() + i);

      const monthName = formatCardDate(date);
      const period = periods.find((c) => c.name === monthName);

      const isFuture = !period;
      const incomes =
        period?.items.filter((item) => item.type === "income") ??
        defaultEntries.incomes;
      const expenses =
        period?.items.filter((item) => item.type === "expense") ??
        defaultEntries.expenses;

      const totalIncome = incomes.reduce((sum, e) => sum + Number(e.amount), 0);
      const totalExpenses = expenses.reduce(
        (sum, e) => sum + Number(e.amount),
        0
      );
      const savings = totalIncome - totalExpenses;

      result.push({
        name: monthName,
        income: totalIncome,
        expenses: totalExpenses,
        savings,
        isFuture,
      });
    }

    return result;
  }, [periods, defaultEntries]);

  return (
    <div className="w-full" style={{ height: 400 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<ChartTooltip />} />
          <Legend />

          <Line
            type="monotone"
            dataKey="income"
            stroke="#2196F3"
            name="Income"
          />
          <Line
            type="monotone"
            dataKey="expenses"
            stroke="#EF5350"
            name="Expenses"
          />
          <Line
            type="monotone"
            dataKey="savings"
            stroke="#4CAF50"
            name="Savings"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FinancialViewChart;
