// components
// import SearchForm from "@/components/SearchForm";

const Hero = () => {
  return (
    <>
      <section className="mb-4 relative z-0 font-Inter">
        <h1
          className="text-[7rem] font-bold text-white absolute top-[12%] left-[7%] z-10 
        max-[1000px]:text-[5.8rem] max-[768px]:text-[5.5rem] max-[768px]:top-[15%] max-[650px]:text-[5rem] max-[650px]:top-[18%] max-[480px]:text-[3.6rem] max-[480px]:top-[15%]
        max-[400px]:text-[3.2rem] max-[400px]:top-[16%] max-[400px]:left-[3%] max-[350px]:text-[2.9rem] max-[350px]:top-[18%] max-[350px]:left-[4%]
        "
        >
          FIND THE
          <div className="rainbowText">BAND TICKETS</div>
        </h1>
        <video
          className={`w-full -z-10  brightness-75 h-[800px] object-cover pt-[252px] max-[480px]:h-[600px] max-[480px]:pt-[180px]`}
          playsInline
          autoPlay
          loop
          muted
          preload="metadata"
        >
          {/* <source src="/videos/resized_band_video2.mp4" type="video/mp4" /> */}
          Your browser does not support the video tag.
        </video>

        <div
          className="max-w-7xl mx-auto px-4 w-[100%] flex flex-col items-center absolute top-[80%] left-[50%] transform -translate-x-1/2 -translate-y-1/2
        max-[480px]:top-[70%]"
        >
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl max-[480px]:text-3xl">
              No Name band Tickets
            </h1>
            {/* <p className="my-4 text-xl text-white max-[480px]:text-base">
              Find the band tickets
            </p> */}
          </div>

          {/* <SearchForm /> */}
        </div>
      </section>
    </>
  );
};

export default Hero;
