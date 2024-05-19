"use client";
import Image from "next/image";
import { useState } from "react";
import { MouseEvent } from "react";

// components
import TitleComponent from "@/components/common/Title";
import ButtonComponent from "@/components/common/Button";

const MerchData = [
  {
    src: "/images/merch/item1.jpg",
    alt: "merchandise-1",
    title: "Merchandise 1",
    price: "$100",
  },
  {
    src: "/images/merch/item2.jpg",
    alt: "merchandise",
    title: "Merchandise 2",
    price: "$200",
  },
  {
    src: "/images/merch/item1.jpg",
    alt: "merchandise",
    title: "Merchandise 3",
    price: "$300",
  },
  {
    src: "/images/merch/item1.jpg",
    alt: "merchandise",
    title: "Merchandise 4",
    price: "$400",
  },
  {
    src: "/images/merch/item1.jpg",
    alt: "merchandise",
    title: "Merchandise 5",
    price: "$500",
  },
];

const Merch = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  //* Down (Clicking)
  const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartX(event.pageX - event.currentTarget.offsetLeft);
    setScrollLeft(event.currentTarget.scrollLeft);
  };

  //* Move (Dragging)
  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    event.preventDefault();
    const x = event.pageX - event.currentTarget.offsetLeft;
    const walk = (x - startX) * 1; // The speed of the scroll
    event.currentTarget.scrollLeft = scrollLeft - walk;
  };

  //* Up (Not Dragging)
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <section className="my-section_lg py-4rem w-[90%] mx-auto ">
      <TitleComponent>MERCH</TitleComponent>
      <div
        className="flex overflow-x-scroll gap-6"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseUp}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
      >
        {MerchData.map((item, index) => (
          <div key={index} style={{ flex: "0 0 auto" }}>
            <Image
              src={item.src}
              alt={item.alt}
              width={200}
              height={100}
              loading="lazy"
              className="hover:opacity-80 max-[480px]:w-[160px] "
            />
            <div className="my-3">
              <p className="text-[0.85rem]">Type</p>
              <p className="my-3 font-bold text-[0.95rem]">{item.title}</p>
              <p className="border-b-2 border-indigo-300 w-[40%]">
                {item.price}
              </p>
            </div>
            <button className="my-3 py-2 px-4 mx-auto w-[100%] bg-blue-500 hover:cursor-pointer hover:opacity-75">
              Details
            </button>
          </div>
        ))}
      </div>
      <ButtonComponent href="/merch">SHOP NOW</ButtonComponent>
    </section>
  );
};

export default Merch;
