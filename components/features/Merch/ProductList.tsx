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
    <section className="">
      <h2 className="text-[4rem] font-bold text-center max-[768px]:text-[3rem] max-[480px]:text-[2.5rem] pt-10 mb-5 ">
        {category.toUpperCase()}
      </h2>

      <div className="flex justify-center w-full mx-auto">
        <div className="flex flex-wrap justify-start w-[95%] gap-4 max-[768px]:flex-nowrap overflow-x-auto">
          {products &&
            products.length > 0 &&
            products.map((product) => (
              <div
                key={product._id}
                className="w-[23%] min-[1100px]:mx-auto max-[1100px]:min-w-[31%] max-[768px]:min-w-[256px] 
                max-[480px]:min-w-[186px] max-[375px]:min-w-[172px]"
              >
                <Link href={`/merch/${product._id}`}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    className={`object-cover brightness-75 cursor-pointer h-[320px]
                  hover:brightness-100 transition duration-300 ease-in-out mx-auto block
                  max-[768px]:h-[260px] max-[480px]:h-[200px]`}
                    width={300}
                    height={300}
                    loading="lazy"
                  />
                </Link>
                <div className="w-full p-2">
                  <h3 className="text-[1.4rem] font-bold max-[768px]:text-[1.1rem] max-[480px]:text-[1rem] max-[375px]:text-[0.95rem]">
                    {product.name}
                  </h3>
                  <p className="max-[480px]:text-[0.9rem] max-[375px]:text-[0.75rem]">
                    {product.description.length > 40
                      ? product.description.slice(0, 40) + "..."
                      : product.description}
                  </p>
                  <p className="text-[0.8rem] tracking-wide border-b w-[40%] max-[480px]:w-[60%]">
                    AUD{" "}
                    <span className="text-[1.8rem] pl-2">{product.price}</span>
                  </p>
                  <Link
                    href={`/merch/${product._id}`}
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
