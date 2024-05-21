"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

// Context (HttpsOnly user login info) & next auth
import { useGlobalContext } from "@/context/GlobalContext";
import { useSession } from "next-auth/react";
import GoBackBtn from "@/components/common/GoBackBtn";
import SpinnerClient from "@/components/common/SpinnerClient";

type ProductType = {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
};

const MerchDetailsPage = () => {
  // Contextを発動 (ユーザーデータを取得)  & Next auth
  const { user, userLoading }: any = useGlobalContext();
  const { data: session }: any = useSession();

  const { merchId } = useParams();
  const [merchData, setMerchData] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  // Fetch product data
  useEffect(() => {
    setLoading(true);
    const fetchMerch = async () => {
      try {
        const res = await fetch(`/api/products/${merchId}`);
        const data = await res.json();
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

  //! PURCHASE Stripe
  const handlePurchaseConfirm = () => {
    startCheckout();
  };

  //! Stripe Checkout
  const startCheckout = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/checkout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            name: merchData?.name,
            price: merchData?.price,
            userId: user?.userID || session?.user?.id,
            merchId: merchId,
          }),
        },
      );
      const resData = await res.json();

      if (resData) {
        // res データがあれば決済ページに遷移
        router.push(resData.checkout_url);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <SpinnerClient />;

  return (
    merchData && (
      <section className="">
        <GoBackBtn text="Go back to Merch" />

        <div className="justify-center items-start gap-12 my-12 px-8 md:flex bg-gray-900 max-w-[960px] mx-auto py-12 rounded-lg max-[480px]:my-6 max-[480px]:mx-6">
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

          <div className="md:-mt-4 max-[768px]:text-center ">
            <h1 className="text-[3rem] max-[480px]:text-[1.9rem] max-[480px]:mt-[2rem]">
              {merchData.name}
            </h1>
            <p className="">Product ID: {merchId} </p>
            <p className="my-10 text-[2rem] max-[480px]:my-4 max-[480px]:text-[1.4rem] ">
              Price: AU$ {merchData.price}{" "}
            </p>
            <p className="text-[1.5rem] max-[480px]:text-[1.2rem] ">
              {merchData.description}
            </p>

            <button
              onClick={() => handlePurchaseClick()}
              className="block w-[70%] mx-auto mt-[6rem] bg-gray-800 border-2 border-white text-white py-2 px-4  hover:bg-gray-700 transition duration-300 ease-in-out
              max-[480px]:mt-[3rem]
              "
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
                  onClick={handlePurchaseConfirm}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
                >
                  Buy
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
        </div>
      </section>
    )
  );
};

export default MerchDetailsPage;
