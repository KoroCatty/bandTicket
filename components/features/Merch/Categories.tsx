import Image from "next/image";

const categories = [
  {
    name: "clothes",
    description: "Stylish band apparel to show your support.",
    image: "/images/merch/item1.jpg",
  },
  {
    name: "instruments",
    description: "Quality instruments used by the band.",
    image: "/images/merch/item2.jpg",
  },
  {
    name: "posters",
    description: "Exclusive posters for true fans only.",
    image: "/images/merch/item3.jpg",
  },
];

const Categories = () => {
  return (
    <section className="my-section_sm max-w-[800px] mx-auto ">
      <h2 className="text-[2rem] font-bold">Category</h2>

      <div className="flex justify-center w-full transform translate-x-[10%] ">
        {categories.map((category, index) => (
          <div key={index} className="relative w-[33%] ">
            <Image
              src={category.image}
              alt={category.name}
              width={300}
              height={600}
              className={`w-[80%] h-[auto] object-cover mr-auto brightness-75 cursor-pointer
              hover:brightness-100 transition duration-300 ease-in-out
              `}
            />
            <div className="absolute bottom-[0] left-[0] w-[100%] bg-black  ">
              <h3 className="text-[2.4rem] font-bold">{category.name}</h3>
              <p className="w-[80%] ">{category.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
