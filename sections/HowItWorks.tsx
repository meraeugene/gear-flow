const HowItWorks = () => {
  return (
    <div>
      <div className="heading__container text-center">
        <h1 className="mb-1 text-3xl font-bold">How It Works</h1>
        <p className="text-lg font-light text-gray-700">
          Renting equipment has never been easier
        </p>
      </div>

      <div className="mt-16 flex items-center justify-center gap-36">
        <div className="flex flex-col items-center justify-center">
          <div className="mb-6 flex h-[4em] w-[4em] items-center justify-center rounded-full bg-gray-300">
            <div className="circle__container flex h-[3em] w-[3em] items-center justify-center rounded-full bg-black text-white">
              <span className="text-3xl">1</span>
            </div>
          </div>
          <div className="content__container flex flex-col items-center gap-2">
            <h1 className="text-xl font-semibold">Browse & Select</h1>
            <p className="text-center text-gray-700">
              Browse our extensive catalog and select <br /> the equipment you
              need
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="mb-6 flex h-[4em] w-[4em] items-center justify-center rounded-full bg-gray-300">
            <div className="circle__container flex h-[3em] w-[3em] items-center justify-center rounded-full bg-black text-white">
              <span className="text-3xl">2</span>
            </div>
          </div>
          <div className="content__container flex flex-col items-center gap-2">
            <h1 className="text-xl font-semibold">Book and Pay</h1>
            <p className="text-center text-gray-700">
              Choose your rental dates and complete <br /> the secure payment
              process online
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="mb-6 flex h-[4em] w-[4em] items-center justify-center rounded-full bg-gray-300">
            <div className="circle__container flex h-[3em] w-[3em] items-center justify-center rounded-full bg-black text-white">
              <span className="text-3xl">3</span>
            </div>
          </div>
          <div className="content__container flex flex-col items-center gap-2">
            <h1 className="text-xl font-semibold">Pick up or Delivery</h1>
            <p className="text-center text-gray-700">
              Pick up your equipment at our location <br /> or choose convenient
              delivery to your site
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
