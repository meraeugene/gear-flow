const Banner = () => {
  return (
    <div className="relative h-[80vh] w-full overflow-hidden">
      {/* Video Wrapper */}
      <div className="absolute top-0 left-0 z-0 h-full w-full">
        <video
          className="h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/assets/videos/hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Persistent Dark Overlay */}
      <div className="absolute top-0 left-0 z-10 h-full w-full bg-black opacity-60" />

      {/* Centered Text Content */}
      <div className="relative z-20 flex h-full w-full flex-col items-center justify-center px-4 text-center text-white">
        <h1 className="mb-2 text-4xl tracking-wider uppercase sm:text-4xl md:text-5xl lg:text-6xl">
          Don't let it sit
        </h1>
        <h2 className="text-xl font-light sm:text-xl md:text-2xl lg:text-3xl">
          Share it, rent it, repeat.
        </h2>
      </div>
    </div>
  );
};

export default Banner;
