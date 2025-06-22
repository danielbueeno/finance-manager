"use client";

import { createContext, ReactNode } from "react";
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
