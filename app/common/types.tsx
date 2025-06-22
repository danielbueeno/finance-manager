export type Entry = {
  name: string;
  amount: number;
  id: string;
  type?: "income" | "expense";
};
export enum EntryVariant {
  big,
  small,
}

export enum CardStatus {
  editting,
  reading,
}
export type Card = {
  id: string;
  name: string;
  incomes: Entry[];
  expenses: Entry[];
};

export enum FinanancialStatus {
  good = "good",
  bad = "bad",
  controlled = "controlled",
}

// /common/types.ts

export enum ItemType {
  income = "income",
  expense = "expense",
}
export type Board = {
  id: string;
  user_id: string;
  name: string;
  created_at: string;
};

export type DefaultItem = {
  id: string;
  board_id: string;
  name: string;
  amount: number;
  type: ItemType;
  created_at: string;
};

export type PeriodItem = {
  id: string;
  name: string;
  amount: number;
  type: ItemType;
  period_id: string;
  created_at: string;
};

export type Period = {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  board_id: string;
  created_at?: string;
  items: PeriodItem[];
};
