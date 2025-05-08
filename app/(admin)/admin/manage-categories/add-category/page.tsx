import AddCategoryForm from "@/components/forms/AddCategoryForm";
import BackButton from "@/components/BackButton";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { addCategoryBreadcrumbs } from "@/data/breadCrumbsLinks";

const page = () => {
  return (
    <main className="p-4 pt-0">
      <div>
        <div className="my-6 border-b border-gray-100 pb-6">
          <div className="mb-6 space-y-4">
            <BackButton />
            <BreadcrumbNav items={addCategoryBreadcrumbs} />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
            Add Category
          </h1>
          <p className="mt-1 text-sm text-gray-600 md:text-base">
            Fill out the details to add a new category.
          </p>
        </div>

        <div className="w-full xl:w-1/2">
          <AddCategoryForm />
        </div>
      </div>
    </main>
  );
};

export default page;
