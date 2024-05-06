"use client";
import { Carousel } from "react-responsive-3d-carousel";
import Image from "next/image";

// components
import TitleComponent from "@/components/common/Title";
import ButtonComponent from "@/components/common/Button";

const Merch = () => {
  const options = {
    height: "500px",
    width: "360px",
    interval: 6000,
  };
  return (
    <section className="py-[4rem]">
      <TitleComponent>MERCH</TitleComponent>

      <Carousel {...options}>
        <Image
          src="/images/item1.jpg"
          alt="merchandise-1"
          width={200}
          height={100}
        />
        <Image
          src="/images/item2.jpg"
          alt="merchandise-2"
          width={200}
          height={100}
          style={{ objectFit: "cover" }}
        />
        <video
          src="/videos/resized_band_video2.mp4"
          playsInline
          muted
          autoPlay
          loop
          preload="metadata"
        />
        {/* <video src="/videos/drum_s.mp4" playsInline muted autoPlay loop preload="metadata" className='w-[100%]' /> */}
      </Carousel>

      <ButtonComponent href="/merch">SHOP NOW</ButtonComponent>
    </section>
  );
};

export default Merch;
