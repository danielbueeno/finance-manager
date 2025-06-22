"use client";

import { ReactNode, useContext } from "react";
import { UserContext } from "@/app/context/UserContext";
import { redirect } from "next/navigation";

export default function BaseAppTemplate({
  children,
}: {
  children?: ReactNode;
}) {
  const { user } = useContext(UserContext);
  if (!user) {
    redirect("/login");
  }

  return children;
}
