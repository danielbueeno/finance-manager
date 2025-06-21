"use client";

import { useContext, ReactNode } from "react";
import { UserContext } from "@/app/context/UserContext";
import { redirect } from "next/navigation";

export default function BaseAppTemplate({
  children,
}: {
  children?: ReactNode;
}) {
  const context = useContext(UserContext);

  if (!context) return null;

  const { user, loading } = context;

  if (loading) {
    return; // TODO: add loading
  }

  if (!user) {
    redirect("/login");
  }

  return children;
}
