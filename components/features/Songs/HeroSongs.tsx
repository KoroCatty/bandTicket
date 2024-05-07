import Image from "next/image";

const HeroSongs = () => {
  return (
    <section>
        <Image src="/images/heroSongs.jpg" alt="About" width={1200} height={600}
          className="w-full h-[580px] object-cover max-[480px]:h-[400px]"
        />
        <div className="absolute top-[50%] left-[20%] transform -translate-x-[20%] -translate-y-1/2 w-[40%]
        max-[768px]:top-[65%] max-[768px]:left-[15%] max-[768px]:-translate-x-[10%] max-[768px]:w-[80%]
        max-[480px]:top-[50%] max-[480px]:left-[10%] max-[480px]:-translate-x-[5%] max-[480px]:w-[80%
        ">
          <h1 className="text-5xl text-white font-bold mb-4 max-[480px]:text-4xl ">Song List</h1>
          <p className="text-xl text-white max-[480px]:text-[0.9rem]">Dive into the dynamic world of NO NAME, a band whose essence captures the very spirit of contemporary music. Our Song List is a testament to the diverse talents of each member, offering a variety of rhythms and melodies that resonate with fans across the globe.</p>
        </div>
    </section>
  )
};

export default HeroSongs;