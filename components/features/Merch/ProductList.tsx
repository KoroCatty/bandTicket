import Image from "next/image";
import Link from "next/link";

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
};

type ProductListProps = {
  products: Product[];
};

const ProductList = ({ products }: ProductListProps) => {
  const category =
    products.length > 0 ? products[0].category : "No Products Available";

  return (
    <section className="my-10">
      <h2 className="text-[4rem] font-bold text-center">
        {category.toUpperCase()}
      </h2>

      <div className="flex justify-center w-full mx-auto">
        <div className="flex flex-wrap justify-start w-[90%] gap-4">
          {products &&
            products.length > 0 &&
            products.map((product) => (
              <div key={product._id} className="w-[23%] mx-auto">
                <Image
                  src={product.image}
                  alt={product.name}
                  className={`object-cover brightness-75 cursor-pointer h-[320px]
                  hover:brightness-100 transition duration-300 ease-in-out mx-auto block
                `}
                  width={300}
                  height={300}
                />
                <div className="w-full bg-black pb-2">
                  <h3 className="text-[1.4rem] font-bold">{product.name}</h3>
                  <p className="w-[80%]">
                    {product.description.length > 40
                      ? product.description.slice(0, 40) + "..."
                      : product.description}
                  </p>
                  <p className="w-[80%] underline pb-1 text-[1.3rem] tracking-wide  ">
                    $ {product.price}
                  </p>
                  <Link
                    href={`/product/${product._id}`}
                    className="w-[80%] bg-slate-800 hover:cursor-pointer hover:opacity-75 py-2 px-6 mx-auto  my-4 block text-center"
                  >
                    Details
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default ProductList;
