import { getAllCategories } from "@/actions/categoryActions";
import { AlertComponent } from "@/components/AlertComponent";
import BackButton from "@/components/BackButton";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import EditUnitForm from "@/components/forms/EditUnitForm";
import { ediUnitBreadcrumbs } from "@/data/breadCrumbsLinks";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const { data, error } = await getAllCategories();

  if (error) {
    return (
      <div className="px-4 py-10 md:px-24">
        <AlertComponent
          variant="destructive"
          message="Error fetching categories."
        />
      </div>
    );
  }

  return (
    <main className="p-4 pt-0">
      <div>
        <div className="mb-6 border-b border-gray-100 pb-6">
          <div className="my-6 space-y-4">
            <BackButton />
            <BreadcrumbNav items={ediUnitBreadcrumbs} />
          </div>

          <h1 className="text-3xl font-bold text-gray-900">Edit Unit</h1>
          <p className="mt-1 text-base text-gray-600">Edit unit details</p>
        </div>

        <div className="w-full md:w-1/2">
          <EditUnitForm categories={data ?? []} unitId={id || ""} />
        </div>
      </div>
    </main>
  );
};

export default page;
