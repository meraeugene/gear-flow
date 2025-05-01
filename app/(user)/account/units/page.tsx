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
      <div className="px-24 py-20">
        <AlertComponent
          variant="destructive"
          message="Error fetching user units."
        />
      </div>
    );
  }

  return (
    <Suspense fallback={<GlobalLoader />}>
      <div className="flex min-h-screen">
        <main className="flex-1 p-8 pt-11">
          <div className="border-b border-gray-100 pb-4">
            <div className="mb-6 space-y-4">
              <BackButton />
              <BreadcrumbNav items={unitsBreadcrumbs} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Units</h1>
            <p className="mt-1 text-base text-gray-600">
              Manage and review all your listed rental units here.
            </p>
          </div>

          <DataTable columns={columns} data={userUnits ?? []} />
        </main>
      </div>
    </Suspense>
  );
};

export default UnitsPage;
