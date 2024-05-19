import Link from "next/link";
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
          className={`w-full -z-10  brightness-75 h-[95vh] object-cover pt-[252px] max-[480px]:h-[600px] max-[480px]:pt-[180px]`}
          playsInline
          autoPlay
          loop
          muted
          preload="metadata"
        >
          <source src="/videos/resized_band_video3.mp4" type="video/mp4" />
          <source src="/videos/resized_band_video_hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div
          className="max-w-7xl mx-auto px-4 w-[100%] flex flex-col items-center absolute top-[80%] left-[50%] transform -translate-x-1/2 -translate-y-1/2
        max-[480px]:top-[70%]"
        >
          <div className="text-center">
            {/* <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl max-[480px]:text-3xl">
              No Name band Tickets
            </h1> */}
            <Link
              href="/tickets"
              className="relative mt-[4rem] inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-400/95 to-pink-400/95
               group-hover:from-purple-500 group-hover:to-pink-300 hover:text-white dark:text-white  focus:outline-none hover:translate-y-0.5 hover:opacity-90
               transition-all ease-in duration-400"
            >
              <span
                className="relative text-[1.2rem] px-[4rem] py-4 transition-all ease-in duration-75 
               rounded-md bg-opacity-40 shadow-lg  shadow-purple-400/40 "
              >
                View Tickets
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
