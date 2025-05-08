"use client";

import BreadcrumbNav from "@/components/BreadcrumbNav";
import BackButton from "@/components/BackButton";
import { myPaymentsBreadcrumbs } from "@/data/breadCrumbsLinks";
import PaymentsTable from "./payments-table";
import { AlertComponent } from "@/components/AlertComponent";
import GlobalLoader from "@/components/GlobalLoader";
import { Suspense } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/services/swrFetcher";

const TransactionsPage = () => {
  const { data, error, isLoading } = useSWR("/api/transactions", fetcher);

  if (isLoading) {
    return <GlobalLoader />;
  }

  const { transactions } = data;

  if (error) {
    return (
      <div className="px-24 py-20">
        <AlertComponent
          variant="destructive"
          message="Error fetching transactions."
        />
      </div>
    );
  }

  return (
    <Suspense fallback={<GlobalLoader />}>
      <main className="p-4 pt-0">
        <div className="mb-6 border-b border-gray-100 pb-6">
          <div className="my-6 space-y-4">
            <BackButton />
            <BreadcrumbNav items={myPaymentsBreadcrumbs} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
            Transactions
          </h1>
          <p className="mt-1 text-sm text-gray-600 md:text-base">
            View the status of your payments, including owner, total price,
            payment method, transaction date.
          </p>
        </div>

        <PaymentsTable transactions={transactions ?? []} />
      </main>
    </Suspense>
  );
};

export default TransactionsPage;
