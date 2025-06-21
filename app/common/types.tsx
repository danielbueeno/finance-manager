export type Entry = { name: string; amount: number; id: string };
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
