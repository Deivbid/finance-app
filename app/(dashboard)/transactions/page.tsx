"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Loader2, Plus } from "lucide-react";

import { columns } from "./columns";
import { DataTable } from "@/components/DataTable";
import { Skeleton } from "@/components/ui/skeleton";
import { useNewTransaction } from "@/features/transactions/hooks/useNewTransaction";
import { useGetTransactions } from "@/features/transactions/api/useGetTransactions";
import { useBulkDeleteTransactions } from "@/features/transactions/api/useBulkDeleteTransaction";
import { useState } from "react";
import { UploadButton } from "./components/UploadButton";
import { ImportCard } from "./components/ImportCard";
import { transactions as transactionsSchema } from "@/db/schema";
import { useSelectAccount } from "../accounts/useSelectAccount";
import { toast } from "@/components/ui/use-toast";
import { useBulkCreateTransactions } from "@/features/transactions/api/useBulkCreate";

enum VARIANTS {
  LIST = "LIST",
  IMPORT = "IMPORT",
}

const INITIAL_IMPORT_RESULTS = {
  data: [],
  errors: [],
  meta: {},
};

const TransactionsPage = () => {
  const [AccountDialog, confirm] = useSelectAccount();
  const [variant, setVariant] = useState(VARIANTS.LIST);
  const [importResults, setImportResults] = useState(INITIAL_IMPORT_RESULTS);
  const bulkCreateMutation = useBulkCreateTransactions();
  const { onOpen } = useNewTransaction();
  // Delete transactions
  const deleteTransactions = useBulkDeleteTransactions();

  //Get transactions
  const transactionsQuery = useGetTransactions();
  const transactions = transactionsQuery.data || [];

  const isDisabled =
    transactionsQuery.isLoading || deleteTransactions.isPending;

  const onUploadCSV = (results: typeof INITIAL_IMPORT_RESULTS) => {
    setImportResults(results);
    setVariant(VARIANTS.IMPORT);
  };

  const onCancelImport = () => {
    setImportResults(INITIAL_IMPORT_RESULTS);
    setVariant(VARIANTS.LIST);
  };

  const onSubmitImport = async (
    values: (typeof transactionsSchema.$inferInsert)[]
  ) => {
    const accountId = await confirm();

    if (!accountId) {
      return toast({
        variant: "destructive",
        description: "Please select an account to continue.",
      });
    }

    const data = values.map((value) => ({
      ...value,
      accountId: accountId as string,
    }));

    bulkCreateMutation.mutate(data, {
      onSuccess: () => {
        onCancelImport();
      },
    });
  };

  if (transactionsQuery.isLoading) {
    return (
      <div className="max-w-screen-2xl mx-auto w-full px-4 py-6 lg:px-14 pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent>
            <div className="h-[500px] w-full flex items-center justify-center">
              <Loader2 className="size-6 text-slate-300 animate-spin" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (variant === VARIANTS.IMPORT) {
    return (
      <>
        <AccountDialog />
        <ImportCard
          data={importResults.data}
          onCancel={onCancelImport}
          onSubmit={onUploadCSV}
        />
      </>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto w-full px-4 py-6 lg:px-14 pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">
            Transactions History
          </CardTitle>
          <div className="flex flex-col lg:flex-row gap-y-2 items-center gap-x-2">
            <Button size="sm" onClick={onOpen} className="w-full lg:auto">
              <Plus className="size-4 mr-2" />
              Add New
            </Button>
            <UploadButton onUpload={onUploadCSV} />
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={transactions}
            filterKey="name"
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id);
              deleteTransactions.mutate({ ids });
            }}
            disabled={isDisabled}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionsPage;
