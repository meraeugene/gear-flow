import AddUnitForm from "@/components/forms/AddUnitForm";
import Aside from "@/components/Aside";
import BackButton from "@/components/BackButton";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { addUnitsBreadcrumbs } from "@/data/breadCrumbsLinks";
import { getAllCategories } from "@/app/auth/actions/categoryActions";
import { AlertComponent } from "@/components/AlertComponent";

const page = async () => {
  const { data: categories, error: categoryError } = await getAllCategories();

  if (categoryError) {
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

      <main className="pb1 flex-1 p-8 pt-11 pb-12">
        <div className="space-y-8">
          <div className="mb-6 border-b border-gray-100 pb-4">
            <div className="mb-6 space-y-4">
              <BackButton />
              <BreadcrumbNav items={addUnitsBreadcrumbs} />
            </div>

            <h1 className="text-3xl font-bold text-gray-900">Add Unit</h1>
            <p className="mt-1 text-base text-gray-600">
              Provide complete details to list your equipment for rent on Gear
              Flow.
            </p>
          </div>
        </div>

        <div className="w-1/2">
          <AddUnitForm categories={categories || []} />
        </div>
      </main>
    </div>
  );
};

export default page;
