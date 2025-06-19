export type Entry = { name: string; amount: number };

export type Card = {
  id: string;
  name: string;
  incomes: Entry[];
  expenses: Entry[];
};
