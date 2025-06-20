"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { Card, Entry } from "../common/types";

type DefaultsContextType = {
  defaultEntries: Card;
  setDefaultEntries: (entries: Card) => void;
};

const DefaultsContext = createContext<DefaultsContextType | undefined>(
  undefined
);

export const DefaultsProvider = ({ children }: { children: ReactNode }) => {
  const [defaultEntries, setDefaultEntries] = useState<Card>({
    id: "defaultValues",
    name: "Default values",
    incomes: [],
    expenses: [],
  });

  return (
    <DefaultsContext.Provider value={{ defaultEntries, setDefaultEntries }}>
      {children}
    </DefaultsContext.Provider>
  );
};

export const useDefaults = () => {
  const context = useContext(DefaultsContext);
  if (!context) {
    throw new Error("useDefaults must be used within a DefaultsProvider");
  }
  return context;
};
