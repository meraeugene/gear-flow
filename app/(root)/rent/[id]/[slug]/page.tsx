import { getUnitById } from "@/app/auth/actions/unitActions";
import { getAuthUser } from "@/app/auth/actions/authActions";
import { generateSlug } from "@/utils/generateSlug";
import { AlertComponent } from "@/components/AlertComponent";
import UnitRent from "@/components/UnitRent";

type Props = {
  params: {
    id: string;
    slug: string;
  };
};

const Page = async ({ params: { id, slug } }: Props) => {
  const [userResult, unitResult] = await Promise.all([
    getAuthUser(),
    getUnitById(id),
  ]);

  const user = userResult.user;
  const unit = unitResult.data;

  if (!user || userResult.error) {
    return (
      <div className="px-24 py-20">
        <AlertComponent
          variant="destructive"
          message="User is not authenticated."
        />
      </div>
    );
  }

  if (!unit || unitResult.error || slug !== generateSlug(unit.name)) {
    return (
      <div className="px-24 py-20">
        <AlertComponent
          variant="destructive"
          message="No unit found or invalid slug."
        />
      </div>
    );
  }

  return <UnitRent user={user} unit={unit} />;
};

export default Page;
