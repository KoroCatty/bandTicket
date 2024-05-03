// components
// import SearchForm from "@/components/SearchForm";

// video
const Hero = () => {
  return (
    <>
      <section className="mb-4 relative h-[600px]">
        <video
          className="w-full -z-10 absolute top-0 left-0 brightness-75"
          playsInline
          autoPlay
          loop
          muted
          preload="none"
        >
          <source src="/videos/resized_band_video2.mp4" type="video/mp4" />
          <track
            src="/videos/resized_band_video2.mp4"
            kind="subtitles"
            srcLang="en"
            label="English"
          />
          Your browser does not support the video tag.
        </video>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center ">
          {/* <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl ">
              No Name band Tickets
            </h1>
            <p className="my-4 text-xl text-white">
              Find the band tickets
            </p>
          </div> */}

          {/* <SearchForm /> */}
        </div>
      </section>
    </>
  );
};

export default Hero;
