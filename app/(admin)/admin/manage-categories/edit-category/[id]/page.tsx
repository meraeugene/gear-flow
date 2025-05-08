import BackButton from "@/components/BackButton";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { editCategoryBreadcrumbs } from "@/data/breadCrumbsLinks";
import EditCategoryForm from "@/components/forms/EditCategoryForm";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  return (
    <main className="p-4 pt-0">
      <div>
        <div className="my-6 border-b border-gray-100 pb-6">
          <div className="mb-6 space-y-4">
            <BackButton />
            <BreadcrumbNav items={editCategoryBreadcrumbs} />
          </div>

          <h1 className="text-3xl font-bold text-gray-900">Edit Category</h1>
          <p className="mt-1 text-base text-gray-600">Edit category</p>
        </div>

        <div className="w-full xl:w-1/2">
          <EditCategoryForm categoryId={id || ""} />
        </div>
      </div>
    </main>
  );
};

export default page;
