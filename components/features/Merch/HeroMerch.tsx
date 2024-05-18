import Image from "next/image";

const HeroMerch = () => {
  return (
    <section className="relative ">
      <div className="absolute top-0 left-0 w-[70%] ">
        <h1 className="text-[4rem] ">
          <span className="block">Official Merchandise</span>
          <span className="block">
            Exclusive Band Items {new Date().getFullYear()}
          </span>
        </h1>
        <p className="w-[50%] mt-4">
          Explore our exclusive collection of band merchandise. From t-shirts
          and hoodies to posters and accessories, find everything you need to
          show your support and rock out in style. Each item is crafted with
          quality and designed for true fans. Shop now and bring a piece of the
          band home with you!
        </p>
      </div>
      <div className="w-full">
        <Image
          className="ml-auto "
          src="/images/heroMerch.jpg"
          alt=""
          width={800}
          height={800}
        />
      </div>
    </section>
  );
};

export default HeroMerch;
