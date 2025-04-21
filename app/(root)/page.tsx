import Categories from "@/sections/Categories";
import Carousel from "@/components/ui/carousel";
import Units from "@/sections/Units";
import NewArrival from "@/sections/NewArrival";
import Banner from "@/sections/Banner";
import HowItWorks from "@/sections/HowItWorks";
import Faqs from "@/sections/Faqs";
import { carouselData } from "@/data/carousel";
import { getAllCategories } from "../auth/actions/categoryActions";
import { getAllOtherUnits } from "../auth/actions/unitActions";

export default async function page() {
  const { data: categories, error: categoryError } = await getAllCategories();
  const { data: units, error: unitsError } = await getAllOtherUnits();

  return (
    <div>
      <Banner />

      <div className="relative h-full w-full overflow-hidden py-20">
        <Carousel slides={carouselData} />
      </div>

      <div className="px-24 py-20">
        <Categories categoriesData={categories ?? []} />
      </div>

      <div className="px-24 py-20">
        <NewArrival />
      </div>

      <div className="px-24 py-20">
        <Units unitsData={units ?? []} />
      </div>

      <div className="py-20">
        <HowItWorks />
      </div>

      <div className="py-20">
        <Faqs />
      </div>
    </div>
  );
}
