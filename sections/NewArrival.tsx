import Image from "next/image";

const NewArrival = () => {
  return (
    <div>
      <div className="heading mb-10 flex flex-col items-center justify-center">
        <p className="text-base">Featured</p>
        <h1 className="text-3xl">New Arrivals</h1>
      </div>

      {/* BACKUP */}
      {/* <div className="grid grid-cols-4 grid-rows-6 gap-8">
        <div className="col-span-2 row-span-6 border">
          <Image
            className="h-full w-full object-cover"
            src="/assets/images/ps5.jpg"
            alt="pic"
            width={1000}
            height={1000}
          />
        </div>
        <div className="col-span-2 col-start-3 row-span-3 border">
          {" "}
          <Image
            className="h-full w-full object-cover"
            src="/assets/images/camera.jpg"
            alt="pic"
            width={1000}
            height={1000}
          />
        </div>
        <div className="col-start-3 row-span-3 row-start-4 border">
          {" "}
          <Image
            className="h-full w-full object-cover"
            src="/assets/images/speaker.jpg"
            alt="pic"
            width={1000}
            height={1000}
          />
        </div>
        <div className="col-start-4 row-span-3 row-start-4 border">
          {" "}
          <Image
            className="h-full w-full object-cover"
            src="/assets/images/tent.jpg"
            alt="pic"
            width={1000}
            height={1000}
          />
        </div>
      </div> */}

      <div className="grid h-[40rem] grid-cols-5 grid-rows-6 gap-4">
        <div className="col-span-3 row-span-6">
          {" "}
          <Image
            className="h-full w-full object-cover"
            src="/assets/images/ps5.jpg"
            alt="pic"
            width={1920}
            height={1080}
          />
        </div>
        <div className="col-span-2 col-start-4 row-span-3">
          {" "}
          <Image
            className="h-full w-full object-cover"
            src="/assets/images/camera.jpg"
            alt="pic"
            width={1920}
            height={1080}
          />
        </div>
        <div className="col-span-2 col-start-4 row-span-3 row-start-4">
          {" "}
          <Image
            className="h-full w-full object-cover"
            src="/assets/images/alexa.jpg"
            alt="pic"
            width={1920}
            height={1080}
          />
        </div>
      </div>
    </div>
  );
};

export default NewArrival;
