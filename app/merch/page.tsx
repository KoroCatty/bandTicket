import HeroMerch from "@/components/features/Merch/HeroMerch";
import ProductList from "@/components/features/Merch/ProductList";
import { Suspense } from "react";

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
};

const fetchProducts = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
    next: { revalidate: 3600 }, // 1h
  });

  if (!res.ok) {
    throw new Error("Something went wrong");
  }
  return res.json();
};

const MerchPage = async () => {
  const products: Product[] = await fetchProducts();

  const clothes = products.filter(
    (product: Product) => product.category === "clothes",
  );
  const instruments = products.filter(
    (product: Product) => product.category === "instruments",
  );

  return (
    <div
      style={{
        backgroundImage: `url('/images/darkBg2.webp')`,
        backgroundPosition: "center",
        backgroundRepeat: "repeat",
      }}
    >
      <HeroMerch />
      <div className="max-w-[1080px] mx-auto">
        <Suspense fallback={<div>Loading...</div>}>
          <ProductList products={clothes} />
          <Suspense fallback={<div>Loading...</div>}>
            <ProductList products={instruments} />
          </Suspense>
        </Suspense>
      </div>
    </div>
  );
};

export default MerchPage;
