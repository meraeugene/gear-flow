"use client";

import BreadcrumbNav from "@/components/BreadcrumbNav";
import BackButton from "@/components/BackButton";
import { usersBreadcrumbs } from "@/data/breadCrumbsLinks";
import UsersTable from "./users-table";
import { AlertComponent } from "@/components/AlertComponent";
import { Suspense } from "react";
import GlobalLoader from "@/components/GlobalLoader";
import useSWR from "swr";
import { fetcher } from "@/lib/services/swrFetcher";

const AdminUsersPage = () => {
  const { data, error, isLoading } = useSWR("/api/users", fetcher);

  if (isLoading) {
    return <GlobalLoader />;
  }

  if (error) {
    return (
      <div className="p-4 py-20 md:px-24">
        <AlertComponent variant="destructive" message="No users found." />;
      </div>
    );
  }

  return (
    <Suspense fallback={<GlobalLoader />}>
      <main className="p-4 pt-0">
        <div className="mb-6 border-b border-gray-100 pb-6">
          <div className="my-6 space-y-4">
            <BackButton />
            <BreadcrumbNav items={usersBreadcrumbs} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
            All Users
          </h1>
          <p className="mt-1 text-sm text-gray-600 md:text-base">
            Manage and review all your listed rental units here.
          </p>
        </div>

        <UsersTable users={data.data ?? []} />
      </main>
    </Suspense>
  );
};

export default AdminUsersPage;
