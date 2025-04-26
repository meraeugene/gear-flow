import Aside from "@/components/Aside";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import BackButton from "@/components/BackButton";
import { usersBreadcrumbs } from "@/data/breadCrumbsLinks";
import { AlertComponent } from "@/components/AlertComponent";
import { getRentalRequestsForMyUnits } from "@/app/auth/actions/rentalRequestActions";
import RentalRequestsTable from "./rental-requests-table";

const page = async () => {
  const { data, error } = await getRentalRequestsForMyUnits();
  console.log(data);

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
    <div className="flex min-h-screen">
      <Aside />

      <main className="flex-1 p-8">
        <div className="mb-6 border-b border-gray-100 pb-6">
          <div className="mb-6 space-y-4">
            <BackButton />
            <BreadcrumbNav items={usersBreadcrumbs} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Rental Requests</h1>
          <p className="mt-1 text-base text-gray-600">
            Manage and review all your listed rental requests for your units
            here.
          </p>
        </div>

        <RentalRequestsTable rentalRequests={data || []} />
      </main>
    </div>
  );
};

export default page;
