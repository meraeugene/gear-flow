import { categoryBackgrounds } from "@/data/categoryBanner";

type CategoryBannerProps = {
  categoryName: string;
};

const CategoryBanner = ({ categoryName }: CategoryBannerProps) => {
  const backgroundImage =
    categoryBackgrounds[categoryName.toLowerCase()] ||
    "/assets/images/default-bg.jpg";

  return (
    <div
      className="relative mt-20 flex h-[150px] w-full items-center justify-center overflow-hidden text-white md:h-[200px] xl:h-[250px]"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-70"></div>

      {/* Text */}
      <h1 className="relative z-10 text-3xl font-bold tracking-widest uppercase lg:text-6xl">
        {categoryName}
      </h1>
    </div>
  );
};

export default CategoryBanner;
