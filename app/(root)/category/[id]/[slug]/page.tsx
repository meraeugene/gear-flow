import { getUnitsByCategory } from "@/app/auth/actions/unitActions";
import { AlertComponent } from "@/components/AlertComponent";
import BackButton from "@/components/BackButton";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import CategoryBanner from "@/components/CategoryBanner";
import CategoryUnits from "@/components/CategoryUnits";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { generateSlug } from "@/utils/generateSlug";

type Props = {
  params: {
    id: string;
    slug: string;
  };
};

const page = async ({ params }: Props) => {
  const { id, slug } = params;

  const { data, error } = await getUnitsByCategory(id);

  if (!data || error || slug !== generateSlug(data[0]?.category || ""))
    return (
      <div className="px-24 py-20">
        <AlertComponent variant="destructive" message="No units found." />;
      </div>
    );

  const breadcrumbs = [
    { title: "Home", href: "/" },
    { title: "Category", href: "/units" },
    {
      title: capitalizeFirstLetter(slug),
      href: `/category/${id}/${slug}}`,
    },
  ];

  const categoryName = data[0]?.category.toLowerCase() || "";

  return (
    <div className="px-24 py-20">
      <div className="space-y-7">
        <BackButton />
        <BreadcrumbNav items={breadcrumbs} />
      </div>

      <CategoryBanner categoryName={categoryName} />

      <CategoryUnits unitsData={data} />
    </div>
  );
};

export default page;
