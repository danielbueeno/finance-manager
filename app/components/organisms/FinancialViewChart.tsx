"use client";
import { useCards } from "@/app/context/CardsContext";
import { useDefaults } from "@/app/context/DefaultContext";
import { useMemo } from "react";
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

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function parseCardDate(cardName: string): Date {
  const [monthStr, yearStr] = cardName.split(" ");
  const monthIndex = monthNames.indexOf(monthStr);
  const year = parseInt(yearStr);
  return new Date(year, monthIndex);
}

function formatCardDate(date: Date): string {
  return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
}

const FinancialViewChart = () => {
  const { defaultEntries } = useDefaults();
  const { cards } = useCards();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const isFuture = chartData.find((item) => item.name === label)?.isFuture;
      return (
        <div className="bg-white border rounded p-2 shadow text-sm">
          <p className="font-semibold">{label}</p>
          {isFuture && (
            <p className="text-purple-600">Prediction based on default</p>
          )}
          {payload.map((item: any) => (
            <p key={item.dataKey}>
              {item.name}: <span className="font-medium">{item.value}</span>
            </p>
          ))}
        </div>
      );
    }

    return null;
  };

  const chartData = useMemo(() => {
    if (!cards.length) return [];

    const startDate = parseCardDate(cards[0].name);
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
      const card = cards.find((c) => c.name === monthName);

      const isFuture = !card;
      const incomes = card?.incomes ?? defaultEntries.incomes;
      const expenses = card?.expenses ?? defaultEntries.expenses;

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
  }, [cards, defaultEntries]);

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
          <Tooltip content={<CustomTooltip />} />
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
