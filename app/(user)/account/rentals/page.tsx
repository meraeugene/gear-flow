"use client";

import BreadcrumbNav from "@/components/BreadcrumbNav";
import BackButton from "@/components/BackButton";
import { myRentalsBreadcrumbs } from "@/data/breadCrumbsLinks";
import RentalsTable from "./rentals-table";
import { AlertComponent } from "@/components/AlertComponent";
import { Suspense } from "react";
import GlobalLoader from "@/components/GlobalLoader";
import useSWR from "swr";
import { fetcher } from "@/lib/services/swrFetcher";

const RentalsPage = () => {
  const { data, error, isLoading } = useSWR("/api/rentals", fetcher);

  if (isLoading) {
    return <GlobalLoader />;
  }

  const { rentals } = data;

  if (error) {
    return (
      <div className="px-24 py-20">
        <AlertComponent
          variant="destructive"
          message="Error fetching rentals."
        />
      </div>
    );
  }

  return (
    <Suspense fallback={<GlobalLoader />}>
      <main className="w-full p-4 pt-0">
        <div className="mb-6 border-b border-gray-100 pb-6">
          <div className="my-6 space-y-4">
            <BackButton />
            <BreadcrumbNav items={myRentalsBreadcrumbs} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
            Rentals
          </h1>
          <p className="mt-1 text-sm text-gray-600 md:text-base">
            View the status of your current and past rentals, including start
            and end dates, delivery method, rental status, rental date, and
            total price.
          </p>
        </div>

        <RentalsTable rentals={rentals ?? []} />
      </main>
    </Suspense>
  );
};

export default RentalsPage;
