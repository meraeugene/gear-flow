import Aside from "@/components/Aside";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import BackButton from "@/components/BackButton";
import {
  myRentalsBreadcrumbs,
  usersBreadcrumbs,
} from "@/data/breadCrumbsLinks";
import { getUser } from "@/app/auth/actions/authActions";
import RentalsTable from "./rentals-table";
import { getRentalStatus } from "@/app/auth/actions/rentalActions";

const page = async () => {
  const { user, error: userError } = await getUser();
  const { rentals, error: rentalsError } = await getRentalStatus();

  return (
    <div className="flex min-h-screen">
      <Aside userRole={user.role} />

      <main className="flex-1 p-8">
        {/* Top nav for mobile */}
        <div className="mb-6 flex items-center justify-between md:hidden">
          <h2 className="text-2xl font-semibold tracking-tight">Dashboard</h2>
          <button className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white shadow hover:opacity-90">
            Menu
          </button>
        </div>

        <div className="mb-6 border-b border-gray-100 pb-6">
          <div className="mb-6 space-y-4">
            <BackButton />
            <BreadcrumbNav items={myRentalsBreadcrumbs} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">My Rentals</h1>
          <p className="mt-1 text-base text-gray-600">
            View the status of your current and past rentals, including start
            and end dates, delivery method, rental status, rental date, and
            total price.
          </p>
        </div>

        <RentalsTable rentals={rentals ?? []} />
      </main>
    </div>
  );
};

export default page;
