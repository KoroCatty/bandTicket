"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { useParams } from "next/navigation";

type ProductType = {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
};

const MerchDetailsPage = () => {
  const { merchId } = useParams();
  const [merchData, setMerchData] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch product data
  useEffect(() => {
    setLoading(true);
    const fetchMerch = async () => {
      try {
        const res = await fetch(`/api/products/${merchId}`);
        const data = await res.json();
        console.log(data);
        setMerchData(data);
        return data;
      } catch (error) {
        console.log("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMerch();
  }, [merchId]);

  const handlePurchaseClick = () => {
    setIsModalOpen(true);
  };
  // モーダルを閉じる
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  //! PURCHASE
  // const handlePurchaseConfirm = () => {
  //   // 購入処理を実行 Stripe
  //   startCheckout();
  // }

  //! Stripe Checkout の実行
  // const startCheckout = async () => {
  //   try {
  //     // endpointを叩く (POSTだが、fetchを使うことに注意)
  //     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       // ここで本の情報をエンドポイントに送る。 route.ts で requestとして受け取れるようになる
  //       body: JSON.stringify({
  //         title: book.title,
  //         price: book.price,
  //         userId: user?.id,
  //         bookId: book.id
  //       })
  //     })
  //     // 返ってきたデータを格納
  //     const resData = await res.json();
  //     // res データがあればページ遷移させる
  //     if (resData) {
  //       router.push(resData.checkout_url);
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  if (loading) return <h1>Loading...</h1>;

  return (
    merchData && (
      <section className="justify-center items-start gap-12 my-12 px-8 md:flex ">
        <div className="">
          <Image
            src={merchData?.image || ""}
            alt="name"
            className="object-cover brightness-75 hover:brightness-100 transition duration-300 ease-in-out 
          mx-auto max-[768px]:w-[50%]
          "
            width={300}
            height={500}
            priority
          />
        </div>

        <div className="md:-mt-4">
          <h1 className="text-[3rem]  ">{merchData.name}</h1>
          <p className="">Product ID: {merchId} </p>
          <p className="my-10 text-[2rem] ">Price: AU$ {merchData.price} </p>
          <p className="text-[1.5rem] ">{merchData.description}</p>

          <button
            onClick={() => handlePurchaseClick()}
            className="block w-[70%] mx-auto mt-[6rem] bg-slate-700 text-white py-2 px-4  hover:bg-gray-800 transition duration-300 ease-in-out"
          >
            Buy Now
          </button>
        </div>

        {isModalOpen && (
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-slate-900 bg-opacity-50 flex justify-center items-center modal">
            <div className="bg-black p-8 rounded-lg">
              <h3 className="text-xl mb-4">
                Are you sure to buy this Product?
              </h3>

              <button
                // onClick={handlePurchaseConfirm}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
              >
                BUY
              </button>

              <button
                onClick={() => handleCancel()}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </section>
    )
  );
};

export default MerchDetailsPage;
