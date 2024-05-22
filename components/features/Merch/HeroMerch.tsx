import Image from "next/image";

const HeroMerch = () => {
  return (
    <section className="relative pt-[2rem] max-[580px]:pt-[0] ">
      <div className="absolute top-0 left-[0] w-[100%] pl-8 max-[900px]:top-[5%] max-[580px]:pl-1 max-[480px]:top-[30%] max-[480px]:text-center pt-[2rem] max-[580px]:pt-[0] ">
        <h1 className="text-[4rem] max-[900px]:text-[3.2rem] max-[768px]:text-[2.6rem] max-[580px]:text-[2.1rem] max-[480px]:text-[1.8rem] max-[350px]:text-[1.5rem]  ">
          <span className="block">Official Merchandise</span>
          <span className="block">
            Exclusive Band Items {new Date().getFullYear()}
          </span>
        </h1>
        <p className="w-[50%] mt-4 max-[768px]:w-[90%] max-[480px]:hidden ">
          Explore our exclusive collection of band merchandise. From t-shirts
          and hoodies to posters and accessories, find everything you need to
          show your support and rock out in style. Each item is crafted with
          quality and designed for true fans. Shop now and bring a piece of the
          band home with you!
        </p>
      </div>

      <div className="w-full max-[900px]:w-[70%] ml-auto max-[580px]:mx-0 max-[580px]:w-full ">
        <Image
          className="ml-auto max-[480px]:h-[200px] object-cover "
          src="/images/heroMerch.jpg"
          alt="Hero Merch Image"
          width={800}
          height={800}
          priority
        />
      </div>
    </section>
  );
};

export default HeroMerch;
