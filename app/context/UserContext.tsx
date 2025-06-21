// app/context/UserContext.tsx
"use client";

import { createContext, ReactNode, useContext } from "react";
import { User } from "@supabase/supabase-js";

export const UserContext = createContext<{ user: User | null }>({
  user: null,
});

export const UserProvider = ({
  children,
  user,
}: {
  children: ReactNode;
  user: User | null;
}) => {
  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

// Hook de uso opcional
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context.user;
};
