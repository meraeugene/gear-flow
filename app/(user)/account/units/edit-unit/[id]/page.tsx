import { getAllCategories } from "@/actions/categoryActions";
import { AlertComponent } from "@/components/AlertComponent";
import Aside from "@/components/Aside";
import BackButton from "@/components/BackButton";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import EditUnitForm from "@/components/forms/EditUnitForm";
import { ediUnitBreadcrumbs } from "@/data/breadCrumbsLinks";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const { data, error } = await getAllCategories();

  if (error) {
    return (
      <div className="px-24 py-20">
        <AlertComponent
          variant="destructive"
          message="Error fetching categories."
        />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <Aside />
      <main className="flex-1 p-8 pt-11 pb-12">
        <div className="space-y-8">
          <div className="mb-6 border-b border-gray-100 pb-4">
            <div className="mb-6 space-y-4">
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
    </div>
  );
};

export default page;
