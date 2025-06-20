"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Card } from "../common/types";

type CardsContextType = {
  cards: Card[];
  setCards: (cards: Card[]) => void;
};

const CardsContext = createContext<CardsContextType | undefined>(undefined);

export const CardsProvider = ({ children }: { children: ReactNode }) => {
  const [cards, setCards] = useState<Card[]>([]);

  return (
    <CardsContext.Provider value={{ cards, setCards }}>
      {children}
    </CardsContext.Provider>
  );
};

export const useCards = () => {
  const context = useContext(CardsContext);
  if (!context) {
    throw new Error("useCards must be used within a CardsProvider");
  }
  return context;
};
