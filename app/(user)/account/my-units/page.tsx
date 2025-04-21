import Aside from "@/components/Aside";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import BackButton from "@/components/BackButton";
import { getUserUnits } from "@/app/auth/actions/unitActions";
import { myUnitsBreadcrumbs } from "@/data/breadCrumbsLinks";
import { dashboardLinks } from "@/data/asideLinks";

const page = async () => {
  const { data: userUnitsData, error } = await getUserUnits();

  return (
    <div className="flex min-h-screen">
      <Aside links={dashboardLinks} />

      <main className="flex-1 p-8">
        {/* Top nav for mobile */}
        <div className="mb-6 flex items-center justify-between md:hidden">
          <h2 className="text-2xl font-semibold tracking-tight">Dashboard</h2>
          <button className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white shadow hover:opacity-90">
            Menu
          </button>
        </div>

        <div className="border-b border-gray-100 pb-4">
          <div className="mb-6 space-y-4">
            <BackButton />
            <BreadcrumbNav items={myUnitsBreadcrumbs} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">My Units</h1>
          <p className="mt-1 text-base text-gray-600">
            Manage and review all your listed rental units here.
          </p>
        </div>

        {/* Items Table */}
        <DataTable columns={columns} data={userUnitsData ?? []} />
      </main>
    </div>
  );
};

export default page;
