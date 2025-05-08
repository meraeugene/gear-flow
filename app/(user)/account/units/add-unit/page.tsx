import AddUnitForm from "@/components/forms/AddUnitForm";
import BackButton from "@/components/BackButton";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { addUnitsBreadcrumbs } from "@/data/breadCrumbsLinks";
import { getAllCategories } from "@/actions/categoryActions";
import { AlertComponent } from "@/components/AlertComponent";

const page = async () => {
  const { data: categories, error: categoryError } = await getAllCategories();

  if (categoryError) {
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
            <BreadcrumbNav items={addUnitsBreadcrumbs} />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
            Add Unit
          </h1>
          <p className="mt-1 text-sm text-gray-600 md:text-base">
            Provide complete details to list your equipment for rent on Gear
            Flow.
          </p>
        </div>
      </div>

      <div className="md:w-1/2">
        <AddUnitForm categories={categories ?? []} />
      </div>
    </main>
  );
};

export default page;
