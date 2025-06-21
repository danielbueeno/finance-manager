"use client";

import { useContext, ReactNode } from "react";
import { UserContext, useUser } from "@/app/context/UserContext";
import { redirect } from "next/navigation";

export default function BaseAppTemplate({
  children,
}: {
  children?: ReactNode;
}) {
  const user = useUser();
  if (!user) {
    redirect("/login");
  }

  return children;
}
