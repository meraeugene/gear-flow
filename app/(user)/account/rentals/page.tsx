import BreadcrumbNav from "@/components/BreadcrumbNav";
import BackButton from "@/components/BackButton";
import { myRentalsBreadcrumbs } from "@/data/breadCrumbsLinks";
import RentalsTable from "./rentals-table";
import { getRentalStatus } from "@/actions/rentalActions";
import { AlertComponent } from "@/components/AlertComponent";
import { Suspense } from "react";
import GlobalLoader from "@/components/GlobalLoader";

const page = async () => {
  const { rentals, error: rentalsError } = await getRentalStatus();

  if (rentalsError) {
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
      <div className="flex min-h-screen">
        <main className="flex-1 p-8">
          <div className="mb-6 border-b border-gray-100 pb-6">
            <div className="mb-6 space-y-4">
              <BackButton />
              <BreadcrumbNav items={myRentalsBreadcrumbs} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Rentals</h1>
            <p className="mt-1 text-base text-gray-600">
              View the status of your current and past rentals, including start
              and end dates, delivery method, rental status, rental date, and
              total price.
            </p>
          </div>

          <RentalsTable rentals={rentals ?? []} />
        </main>
      </div>
    </Suspense>
  );
};

export default page;
