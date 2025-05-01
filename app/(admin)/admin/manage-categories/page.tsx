"use client";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import BackButton from "@/components/BackButton";
import { AlertComponent } from "@/components/AlertComponent";
import { categoriesBreadcrumbs } from "@/data/breadCrumbsLinks";
import { Suspense } from "react";
import GlobalLoader from "@/components/GlobalLoader";
import useSWR from "swr";
import { fetcher } from "@/lib/services/swrFetcher";

const AdminCategoriesPage = () => {
  const { data, error, isLoading } = useSWR("/api/categories", fetcher);

  if (isLoading) {
    return <GlobalLoader />;
  }

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
      <main className="flex-1 p-8 pt-11">
        <div className="border-b border-gray-100 pb-4">
          <div className="mb-6 space-y-4">
            <BackButton />
            <BreadcrumbNav items={categoriesBreadcrumbs} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
          <p className="mt-1 text-base text-gray-600">
            Manage all categories of a unit here.
          </p>
        </div>

        <DataTable columns={columns} data={data?.data ?? []} />
      </main>
    </Suspense>
  );
};

export default AdminCategoriesPage;
