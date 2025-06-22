import { Period } from "./types";

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

export function parseCardDate(cardName: string): Date {
  const [monthStr, yearStr] = cardName.split(" ");
  const monthIndex = monthNames.indexOf(monthStr);
  const year = parseInt(yearStr);
  return new Date(year, monthIndex);
}

export function formatCardDate(date: Date): string {
  return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
}

export function periodToCard(period: Period) {
  const entries = period.items.map((item) => ({
    id: item.id,
    name: item.name,
    amount: item.amount,
    type: item.type,
  }));

  return {
    id: period.id,
    name: period.name,
    incomes: period.items.filter((e) => e.type === "income"),
    expenses: entries.filter((e) => e.type === "expense"),
  };
}
export function periodsToCards(periods: Period[]) {
  return periods.map(periodToCard);
}
