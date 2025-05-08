import { generateSlug } from "@/utils/string/generateSlug";
import { AlertComponent } from "@/components/AlertComponent";
import UnitRent from "@/components/UnitRent";
import { getUnitDetailsWithUserInfo } from "@/actions/unitActions";
import { Suspense } from "react";
import GlobalLoader from "@/components/GlobalLoader";

const page = async ({
  params,
}: {
  params: Promise<{ id: string; categoryId: string; slug: string }>;
}) => {
  const id = (await params).id;
  const slug = (await params).slug;

  const { userData, unit, error } = await getUnitDetailsWithUserInfo(id);

  if (error || slug !== generateSlug(unit.name)) {
    return (
      <div className="px-4 py-20 md:px-24 lg:px-12">
        <AlertComponent variant="destructive" message="No unit found." />
      </div>
    );
  }

  return (
    <Suspense fallback={<GlobalLoader />}>
      <UnitRent user={userData} unit={unit} />
    </Suspense>
  );
};

export default page;
