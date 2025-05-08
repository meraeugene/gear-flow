"use client";

import BreadcrumbNav from "@/components/BreadcrumbNav";
import BackButton from "@/components/BackButton";
import { rentalRequestBreadcrumbs } from "@/data/breadCrumbsLinks";
import { AlertComponent } from "@/components/AlertComponent";
import { Suspense } from "react";
import GlobalLoader from "@/components/GlobalLoader";
import RentalRequestsCard from "./rental-requests-card";
import useSWR from "swr";
import { fetcher } from "@/lib/services/swrFetcher";

const RentalRequestsPage = () => {
  const { data, error, isLoading } = useSWR("/api/rental-requests", fetcher);

  if (isLoading) {
    return <GlobalLoader />;
  }

  if (error) {
    return (
      <div className="p-6 py-20 md:px-24">
        <AlertComponent
          variant="destructive"
          message="No rental requests found."
        />
        ;
      </div>
    );
  }

  return (
    <Suspense fallback={<GlobalLoader />}>
      <main className="p-4 pt-0">
        <div className="mb-6 border-b border-gray-100 pb-6">
          <div className="my-6 space-y-4">
            <BackButton />
            <BreadcrumbNav items={rentalRequestBreadcrumbs} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
            Rental Requests
          </h1>
          <p className="mt-1 text-sm text-gray-600 md:text-base">
            Manage and review all your listed rental requests for your units
            here.
          </p>
        </div>

        <div>
          <RentalRequestsCard rentalRequests={data?.data ?? []} />
        </div>
      </main>
    </Suspense>
  );
};

export default RentalRequestsPage;
