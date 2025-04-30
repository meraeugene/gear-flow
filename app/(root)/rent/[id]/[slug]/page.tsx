import { generateSlug } from "@/utils/string/generateSlug";
import { AlertComponent } from "@/components/AlertComponent";
import UnitRent from "@/components/UnitRent";
import { getUnitDetailsWithUserInfo } from "@/actions/unitActions";

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
      <div className="px-24 py-20">
        <AlertComponent variant="destructive" message="No unit found." />
      </div>
    );
  }

  return <UnitRent user={userData} unit={unit} />;
};

export default page;
