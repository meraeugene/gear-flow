import BreadcrumbNav from "@/components/BreadcrumbNav";
import BackButton from "@/components/BackButton";
import { rentalRequestBreadcrumbs } from "@/data/breadCrumbsLinks";
import { AlertComponent } from "@/components/AlertComponent";
import { getRentalRequestsForMyUnits } from "@/actions/rentalRequestActions";
import { Suspense } from "react";
import GlobalLoader from "@/components/GlobalLoader";
import RentalRequestsCard from "./rental-requests-card";

const page = async () => {
  const { data, error } = await getRentalRequestsForMyUnits();

  if (error) {
    return (
      <div className="px-24 py-20">
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
      <main className="overflow-hidden p-8">
        <div className="mb-6 border-b border-gray-100 pb-6">
          <div className="mb-6 space-y-4">
            <BackButton />
            <BreadcrumbNav items={rentalRequestBreadcrumbs} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Rental Requests</h1>
          <p className="mt-1 text-base text-gray-600">
            Manage and review all your listed rental requests for your units
            here.
          </p>
        </div>

        <div className="overflow-hidden">
          <RentalRequestsCard rentalRequests={data ?? []} />
        </div>
      </main>
    </Suspense>
  );
};

export default page;
