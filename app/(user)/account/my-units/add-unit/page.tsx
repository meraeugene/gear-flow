import AddUnitForm from "@/components/forms/AddUnitForm";
import Aside from "@/components/Aside";
import BackButton from "@/components/BackButton";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { addUnitsBreadcrumbs } from "@/data/breadCrumbsLinks";
import { dashboardLinks } from "@/data/asideLinks";
import { getAllCategories } from "@/app/auth/actions/categoryActions";

const page = async () => {
  const { data: categories, error: categoryError } = await getAllCategories();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Aside links={dashboardLinks} />

      {/* Main content */}
      <main className="pb1 flex-1 p-8 pb-12">
        {/* Top nav for small screens */}
        <div className="mb-6 flex items-center justify-between md:hidden">
          <h2 className="text-2xl font-semibold tracking-tight">Dashboard</h2>
          <button>Menu</button>
        </div>

        {/* Dashboard Content */}
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
