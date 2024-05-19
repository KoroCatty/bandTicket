import Image from "next/image";

const categories = [
  {
    name: "clothes",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque.",
    image: "/images/merch/item1.jpg",
  },
  {
    name: "instruments",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque.",
    image: "/images/merch/item2.jpg",
  },
  {
    name: "posters",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque.",
    image: "/images/merch/item3.jpg",
  },
];

const Categories = () => {
  return (
    <section className="my-section_sm">
      <h2 className="text-[2rem] font-bold">Category</h2>
      <div className="flex justify-center w-full ">
        {categories.map((category, index) => (
          <div key={index} className="relative w-[33%] ">
            <Image
              src={category.image}
              alt={category.name}
              width={300}
              height={600}
              className="w-[80%] h-[auto] object-cover"
            />
            <div className="absolute top-0 left-0 w-[30%] ">
              <h3 className="text-[1.5rem] font-bold">{category.name}</h3>
              <p>{category.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
