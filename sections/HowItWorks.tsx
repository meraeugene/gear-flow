const HowItWorks = () => {
  return (
    <>
      <div className="heading__container text-center">
        <h1 className="mb-1 text-2xl font-bold sm:text-3xl lg:text-4xl">
          How It Works
        </h1>
        <p className="text-base font-light text-gray-700 sm:text-lg">
          Renting equipment has never been easier
        </p>
      </div>

      <div className="mt-12 flex flex-col items-center justify-center gap-20 md:mt-16 md:flex-row md:gap-10 lg:gap-20">
        {[1, 2, 3].map((step, index) => {
          const titles = [
            "Browse & Select",
            "Book and Pay",
            "Pick up or Delivery",
          ];
          const descriptions = [
            "Browse our extensive catalog and select the equipment you need",
            "Choose your rental dates and complete the secure payment process online",
            "Pick up your equipment at our location or choose convenient delivery to your site",
          ];

          return (
            <div
              key={step}
              className="flex flex-col items-center justify-center text-center"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gray-300">
                <div className="circle__container flex h-12 w-12 items-center justify-center rounded-full bg-black text-white">
                  <span className="text-2xl sm:text-3xl">{step}</span>
                </div>
              </div>
              <div className="content__container flex flex-col items-center gap-2">
                <h1 className="text-lg font-semibold sm:text-xl lg:text-2xl">
                  {titles[index]}
                </h1>
                <p className="max-w-xs text-sm text-gray-700 sm:text-base md:text-xs lg:text-sm xl:text-base">
                  {descriptions[index]}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default HowItWorks;
