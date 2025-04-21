import { getAllOtherUnits } from "@/app/auth/actions/unitActions";
import { getUser } from "@/app/auth/actions/authActions";
import { notFound } from "next/navigation";
import { generateSlug } from "@/utils/generateSlug";
import UnitCheckoutClient from "@/components/UnitCheckoutClient";

type Props = {
  params: {
    id: number;
    slug: string;
  };
};

const page = async ({ params }: Props) => {
  const { id, slug } = params;

  const { user } = await getUser();
  const { data: units, error: unitsError } = await getAllOtherUnits();

  if (!units || unitsError) return notFound();

  const unit = units.find((u) => u.id === id);
  if (!unit || slug !== generateSlug(unit.name)) return notFound();

  return <UnitCheckoutClient user={user} unit={unit} />;
};

export default page;
