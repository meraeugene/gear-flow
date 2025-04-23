import { getUnitById } from "@/app/auth/actions/unitActions";
import { getUser } from "@/app/auth/actions/authActions";
import { notFound } from "next/navigation";
import { generateSlug } from "@/utils/generateSlug";
import { AlertComponent } from "@/components/AlertComponent";
import UnitRent from "@/components/UnitRent";

type Props = {
  params: {
    id: string;
    slug: string;
  };
};

const page = async ({ params }: Props) => {
  const { id, slug } = params;

  const { user, error: userError } = await getUser();
  if (!user || userError)
    return (
      <div className="px-24 py-20">
        <AlertComponent
          variant="destructive"
          message="User is not authenticated."
        />
        ;
      </div>
    );

  const { data: unit, error: unitError } = await getUnitById(id);
  if (!unit || unitError)
    return (
      <div className="px-24 py-20">
        <AlertComponent variant="destructive" message="No unit found." />;
      </div>
    );

  if (!unit || slug !== generateSlug(unit.name)) return notFound();

  return <UnitRent user={user} unit={unit} />;
};

export default page;
