"use client";

import FinancialOverview from "./components/organisms/FinancialOverview";
import BaseAppTemplate from "./components/templates/BaseAppTemplate";

export default function Home() {
  return (
    <BaseAppTemplate>
      <FinancialOverview />
    </BaseAppTemplate>
  );
}
