"use client";

import { User } from "@supabase/supabase-js";
import { createContext, ReactNode, useEffect, useState } from "react";
import { createClient } from "../utils/supabase/client";

export type UserContextType = {
  user: User | null;
  loading: boolean;
};

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data, error }) => {
      if (!error && data?.user) {
        setUser(data.user);
      }
      setLoading(false);
    });
  }, [supabase]);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};
