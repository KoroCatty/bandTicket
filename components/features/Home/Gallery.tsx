"use client";
import { Carousel } from "react-responsive-3d-carousel";
import Image from "next/image";

// components

const Gallery = () => {
  const options = {
    height: "300px",
    width: "600px",
    interval: 6000,
  };
  return (
    <section className="py-[4rem]">
      {/* <TitleComponent>MERCH</TitleComponent> */}

      <Carousel {...options}>
        {/* <Image
          src="/images/item1.jpg"
          alt="merchandise-1"
          width={200}
          height={100}
        /> */}
        <video
          src="/videos/resized_band_video2.mp4"
          playsInline
          muted
          autoPlay
          loop
          preload="metadata"
        />
        <video
          src="/videos/resized_band_video4.mp4"
          playsInline
          muted
          autoPlay
          loop
          preload="metadata"
        />
        <video
          src="/videos/resized_band_video.mp4"
          playsInline
          muted
          autoPlay
          loop
          preload="metadata"
        />
        <video
          src="/videos/resized_band_video5.mp4"
          playsInline
          muted
          autoPlay
          loop
          preload="metadata"
        />
        {/* <video src="/videos/drum_s.mp4" playsInline muted autoPlay loop preload="metadata" className='w-[100%]' /> */}
      </Carousel>
    </section>
  );
};

export default Gallery;
