import Aside from "@/components/Aside";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import BackButton from "@/components/BackButton";
import { getAuthUserUnits } from "@/actions/unitActions";
import { AlertComponent } from "@/components/AlertComponent";
import { unitsBreadcrumbs } from "@/data/breadCrumbsLinks";

const page = async () => {
  const { data: userUnitsData, error } = await getAuthUserUnits();

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
    <div className="flex min-h-screen">
      <Aside />

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

        <DataTable columns={columns} data={userUnitsData ?? []} />
      </main>
    </div>
  );
};

export default page;
