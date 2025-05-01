import {
  getAllCategories,
  getUnitsByCategory,
} from "@/actions/categoryActions";
import { AlertComponent } from "@/components/AlertComponent";
import BackButton from "@/components/BackButton";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import GlobalLoader from "@/components/GlobalLoader";
import { unitsBreadcrumbs } from "@/data/breadCrumbsLinks";
import Units from "@/sections/Units";
import { Category } from "@/types";
import { generateSlug } from "@/utils/string/generateSlug";
import { Suspense } from "react";
const page = async () => {
  const { data: categories, error } = await getAllCategories();

  if (error || !categories) {
    return (
      <div className="px-24 py-20">
        <AlertComponent
          variant="destructive"
          message="Failed to load categories."
        />
        ;
      </div>
    );
  }

  const categoryUnitPairs = await Promise.all(
    categories.map(async (category: Category) => {
      const unitsResponse = await getUnitsByCategory(category.id);

      return {
        category,
        units: unitsResponse?.units || [],
      };
    }),
  );

  return (
    <Suspense fallback={<GlobalLoader />}>
      <div className="space-y-7 px-24 pt-12">
        <BackButton />
        <BreadcrumbNav items={unitsBreadcrumbs} />
      </div>

      <div className="flex flex-col gap-14 px-24 py-20 pt-12">
        {categoryUnitPairs.map(({ category, units }) => {
          if (!units || units.length === 0) return null;

          return (
            <Units
              key={category.id}
              href={`/category/${category.id}/${generateSlug(category.name)}`}
              unitsData={units}
              unitTitle={category.name}
            />
          );
        })}
      </div>
    </Suspense>
  );
};

export default page;
