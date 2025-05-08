"use client";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import BackButton from "@/components/BackButton";
import { AlertComponent } from "@/components/AlertComponent";
import { unitsBreadcrumbs } from "@/data/breadCrumbsLinks";
import { Suspense } from "react";
import GlobalLoader from "@/components/GlobalLoader";
import useSWR from "swr";
import { fetcher } from "@/lib/services/swrFetcher";

const UnitsPage = () => {
  const { data, error, isLoading } = useSWR("/api/units", fetcher);

  if (isLoading) {
    return <GlobalLoader />;
  }

  const { userUnits } = data;

  if (error) {
    return (
      <div className="px-4 py-10 md:px-24">
        <AlertComponent
          variant="destructive"
          message="Error fetching user units."
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
            <BreadcrumbNav items={unitsBreadcrumbs} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
            Units
          </h1>
          <p className="mt-1 text-sm text-gray-600 md:text-base">
            Manage and review all your listed rental units here.
          </p>
        </div>

        <DataTable columns={columns} data={userUnits ?? []} />
      </main>
    </Suspense>
  );
};

export default UnitsPage;
