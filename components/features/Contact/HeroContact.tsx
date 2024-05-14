import Image from "next/image";

const HeroContact = () => {
  return (
    <section>
      <Image
        src="/images/heroContact.jpg"
        alt="About"
        width={1000}
        height={600}
        priority
        className="w-full h-[70vh] object-cover max-[999px]:h-[55vh] max-[480px]:h-[40vh] min-[1000px]:hidden"
      />
      <Image
        src="/images/heroContact_pc.jpg"
        alt="About"
        width={1200}
        height={600}
        priority
        className="w-full h-[40vh] object-cover max-[480px]:h-[400px] max-[999px]:hidden "
      />
      <div
        className="absolute top-[25%] left-[70%] transform -translate-x-1/2 -translate-y-1/2 text-center w-[55%]
    max-[768px]:w-[63%]  max-[768px]:left-[65%] max-[480px]:left-[60%]
    "
      >
        <h1
          className="text-[5rem] tracking-wide text-white font-bold mb-4 
      max-[767px]:text-[3.5rem] max-[480px]:text-[2.7rem] max-[480px]:mb-2 max-[480px]:leading-[2.5rem
        max-[350px]:text-[2.2rem]
      "
        >
          Contact Us
        </h1>
      </div>
    </section>
  );
};

export default HeroContact;
