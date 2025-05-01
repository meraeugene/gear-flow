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
      <div className="flex min-h-screen">
        <main className="flex-1 p-8">
          <div className="mb-6 border-b border-gray-100 pb-6">
            <div className="mb-6 space-y-4">
              <BackButton />
              <BreadcrumbNav items={myPaymentsBreadcrumbs} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
            <p className="mt-1 text-base text-gray-600">
              View the status of your payments, including owner, total price,
              payment method, transaction date.
            </p>
          </div>

          <PaymentsTable transactions={transactions ?? []} />
        </main>
      </div>
    </Suspense>
  );
};

export default TransactionsPage;
