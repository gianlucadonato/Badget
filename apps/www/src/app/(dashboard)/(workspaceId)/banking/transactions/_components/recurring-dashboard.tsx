"use client";

import * as React from "react";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@dingify/ui/components/resizable";
import { TooltipProvider } from "@dingify/ui/components/tooltip";

import { CategoriesTable } from "@/app/(dashboard2)/(workspaceId)/banking/recurring/_components/allocation-table";
import { CategoriesDisplay } from "@/app/(dashboard2)/(workspaceId)/banking/recurring/_components/categories-display";
import { Investmentcards } from "@/app/(dashboard2)/(workspaceId)/banking/recurring/_components/investment-cards";
import { RecurringSpentSoFarCard } from "@/app/(dashboard2)/(workspaceId)/banking/recurring/_components/total-balance-card";
import { mails } from "@/app/(dashboard2)/(workspaceId)/banking/recurring/data";
import { RecurringTableNext } from "@/app/(dashboard2)/(workspaceId)/banking/transactions/_components/allocation-table-next";
import { Mail } from "@/app/(dashboard2)/(workspaceId)/banking/transactions/data";
import { useMail } from "@/app/(dashboard2)/(workspaceId)/banking/transactions/use-mail";
import { TopCategoriesTable } from "@/app/(dashboard2)/(workspaceId)/dashboard/_components/top-categories-table";

interface MailProps {
  accounts: {
    label: string;
    email: string;
    icon: React.ReactNode;
  }[];
  mails: Mail[];
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

export function RecurringDashboard({
  accounts,
  defaultLayout = [20, 40, 40],
  defaultCollapsed = false,
  navCollapsedSize,
}: MailProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  const [mail] = useMail();

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout-recurring=${JSON.stringify(
            sizes,
          )}`;
        }}
        className="h-full max-h-[1200px] items-stretch"
      >
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          {/* <Separator /> */}
          <RecurringSpentSoFarCard />
          <div>
            {/* <SmallInvestmentCard /> */}
            <CategoriesTable />
            <RecurringTableNext />
            {/* <HoldingsTable /> */}
          </div>
          <div>
            <Investmentcards items={mails} />
          </div>
          <TopCategoriesTable />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[2]}>
          <CategoriesDisplay
            mail={mails.find((item) => item.id === mail.selected) || null}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}
