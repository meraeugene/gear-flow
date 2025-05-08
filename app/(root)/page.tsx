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

      <div className="p-4 py-20 lg:px-12 xl:px-24">
        <Categories categoriesData={categories ?? []} />
      </div>

      <div className="p-4 py-20 md:px-16 lg:px-12 xl:px-24">
        <NewArrival newArrivalsData={newArrivals ?? []} />
      </div>

      <div className="p-4 py-20 lg:px-12 xl:px-24">
        <Units unitTitle="Units" href="/units" unitsData={units ?? []} />
      </div>

      <div className="p-4 py-20 lg:px-12 xl:px-24">
        <HowItWorks />
      </div>

      <div className="p-4 py-20 lg:px-12 xl:px-24">
        <Faqs />
      </div>
    </div>
  );
}
