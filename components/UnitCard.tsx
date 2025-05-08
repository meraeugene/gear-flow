import { UnitWithOwner } from "@/types";
import { formatCurrency } from "@/utils/currency/formatCurrency";
import { generateSlug } from "@/utils/string/generateSlug";
import Image from "next/image";
import Link from "next/link";

interface UnitCardProps {
  unitData: UnitWithOwner;
}

const UnitCard: React.FC<UnitCardProps> = ({ unitData }) => {
  const {
    unit_id,
    image_url,
    name,
    price_per_day,
    category_id,
    category_name,
  } = unitData;

  const slug = generateSlug(name);

  return (
    <article>
      <Link prefetch={true} href={`/units/${unit_id}/${slug}/${category_id}`}>
        <div className="image h-[15rem] overflow-hidden border md:h-[25rem] lg:h-[20rem] xl:h-[25rem]">
          <Image
            className="h-full w-full object-cover"
            src={image_url}
            alt={name}
            width={1980}
            height={1020}
            priority
          />
        </div>

        <div className="product__information mt-4">
          <h2 className="text-base font-medium">{name}</h2>
          <p className="text-base text-gray-600">{category_name}</p>
          <p className="mt-1 text-base font-bold">
            {formatCurrency(price_per_day)}
          </p>
          {/* <span
            className={`text-sm font-medium capitalize ${
              availability === "available" ? "text-green-600" : "text-red-500"
            }`}
          >
            {availability}
          </span> */}

          {/* <p className="text-sm text-gray-700">{description}</p> */}
        </div>
      </Link>
    </article>
  );
};

export default UnitCard;
