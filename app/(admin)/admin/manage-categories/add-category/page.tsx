import AddCategoryForm from "@/components/forms/AddCategoryForm";
import Aside from "@/components/Aside";
import BackButton from "@/components/BackButton";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { addCategoryBreadcrumbs } from "@/data/breadCrumbsLinks";

const page = () => {
  return (
    <div className="flex min-h-screen">
      <Aside />

      <main className="flex-1 p-8 pt-11 pb-12">
        <div className="space-y-8">
          <div className="mb-6 border-b border-gray-100 pb-4">
            <div className="mb-6 space-y-4">
              <BackButton />
              <BreadcrumbNav items={addCategoryBreadcrumbs} />
            </div>

            <h1 className="text-3xl font-bold text-gray-900">Add Category</h1>
            <p className="mt-1 text-base text-gray-600">
              Fill out the details to add a new category.
            </p>
          </div>

          <div className="w-full md:w-1/2">
            <AddCategoryForm />
          </div>
        </div>
      </main>
    </div>
  );
};

export default page;
