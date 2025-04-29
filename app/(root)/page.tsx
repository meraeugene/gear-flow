import Categories from "@/sections/Categories";
import Units from "@/sections/Units";
import NewArrival from "@/sections/NewArrival";
import Banner from "@/sections/Banner";
import HowItWorks from "@/sections/HowItWorks";
import Faqs from "@/sections/Faqs";
import { carouselData } from "@/data/carousel";
import { getAllCategories } from "../../actions/categoryActions";
import { getAllOtherUnits, getNewArrivals } from "../../actions/unitActions";
import Carousel from "@/components/ui/carousel";

export default async function page() {
  const [{ data: categories }, { data: units }, { data: newArrivals }] =
    await Promise.all([
      getAllCategories(),
      getAllOtherUnits(),
      getNewArrivals(),
    ]);

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
        <NewArrival newArrivalsData={newArrivals ?? []} />
      </div>

      <div className="px-24 py-20">
        <Units unitTitle="Units" unitsData={units ?? []} href="/units" />
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
