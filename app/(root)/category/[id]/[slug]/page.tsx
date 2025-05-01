import { getUnitsByCategory } from "@/actions/categoryActions";
import { AlertComponent } from "@/components/AlertComponent";
import BackButton from "@/components/BackButton";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import CategoryBanner from "@/components/CategoryBanner";
import CategoryUnits from "@/components/CategoryUnits";
import GlobalLoader from "@/components/GlobalLoader";
import { capitalizeFirstLetter } from "@/utils/string/capitalizeFirstLetter";
import { generateSlug } from "@/utils/string/generateSlug";
import { Suspense } from "react";

const CategoryPage = async ({
  params,
}: {
  params: Promise<{ id: string; slug: string }>;
}) => {
  const id = (await params).id;
  const slug = (await params).slug;

  const { units, error } = await getUnitsByCategory(id);

  if (!units || error || slug !== generateSlug(units[0]?.category_name ?? "")) {
    return (
      <div className="px-24 py-20">
        <AlertComponent variant="destructive" message="No units found." />
      </div>
    );
  }

  const breadcrumbs = [
    { title: "Home", href: "/" },
    { title: "Category", href: "/units" },
    {
      title: capitalizeFirstLetter(slug),
      href: `/category/${id}/${slug}`,
    },
  ];

  const categoryName = units[0]?.category_name.toLowerCase() ?? "";

  return (
    <Suspense fallback={<GlobalLoader />}>
      <div className="px-24 py-20">
        <div className="space-y-7">
          <BackButton />
          <BreadcrumbNav items={breadcrumbs} />
        </div>

        <CategoryBanner categoryName={categoryName} />

        <CategoryUnits unitsData={units} />
      </div>
    </Suspense>
  );
};

export default CategoryPage;
