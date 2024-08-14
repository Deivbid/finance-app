"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNewAccount } from "@/features/accounts/hooks/useNewAccount";
import { Plus } from "lucide-react";

import { columns, Payment } from "./columns";
import { DataTable } from "@/components/DataTable";

const data: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "728ed52f",
    amount: 600,
    status: "success",
    email: "a@example.com",
  },
  {
    id: "728ed52f",
    amount: 200,
    status: "processing",
    email: "c@example.com",
  },
  // ...
];

const AccountsPage = () => {
  const { onOpen } = useNewAccount();
  return (
    <div className="max-w-screen-2xl mx-auto w-full px-4 py-6 lg:px-14 pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">Accounts Page</CardTitle>
          <Button size="sm" onClick={onOpen}>
            <Plus className="size-4 mr-2" />
            Add New
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={data} filterKey="email" />
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountsPage;
