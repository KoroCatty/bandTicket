import Image from "next/image";

const HeroAbout = () => {
  return (
    <section>
      <Image
        src="/images/heroAbout.jpg"
        alt="About"
        width={1200}
        height={600}
        className="w-full h-[260px] object-cover max-[768px]:h-[220px] max-[480px]:h-[200px]"
      />
      <div
        className="absolute top-[20%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-[50%]
        max-[768px]:w-[80%]
        max-[480px]:top-[20%] max-[480px]:w-[95%] max-[480px]:left-1/2 max-[480px]:transform 
        max-[375px]:top-[25%] max-[320px]:top-[30%]
        "
      >
        <h1 className="text-5xl text-white font-bold mb-4 max-[480px]:text-3xl ">
          About Members
        </h1>
        <p className="text-xl text-white max-[480px]:text-[0.8rem] max-[480px]:leading-6">
          Meet the heart and soul of NO NAME, a band that thrums with the energy
          of its vibrant members, each bringing their unique flair to the music
          we all love.
        </p>
      </div>
    </section>
  );
};

export default HeroAbout;
