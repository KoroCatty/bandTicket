"use client";

import { useState, useEffect } from "react";

import Image from "next/image";
import Link from "next/link";

// next-auth (logged in user data)
import { useSession } from "next-auth/react";

// default profile Image
// import profileDefaultImg from "/images/default_icon.png";

// react-toastify
import { toast } from "react-toastify";

// components
import SpinnerClient from "@/components/common/SpinnerClient";

// todo (might need to be adjusted)
type SessionTypes = {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

const ProfilePage = () => {
  // Pull out logged in user data
  const { data: session } = useSession();
  const profileImage = session?.user?.image; // get user image from session
  const profileName = session?.user?.name;
  const profileEmail = session?.user?.email;

  // useState
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // console.log(session?.user);

  //! Delete Property
  // const handleDeleteProperty = async (propertyId: string) => {
  //   const confirmed = window.confirm("Are you sure to delete this property?");
  //   if (!confirmed) return;
  //   try {
  //     // make DELETE request to server
  //     const res = await fetch(`/api/properties/${propertyId}`, {
  //       method: "DELETE", //! explicitly set
  //     });

  //     if (res.status === 200) {
  //       // Remove the property from the UI (idと一致しないものだけを残す)
  //       const updatedProperties = properties.filter(
  //         (property: any) => property._id !== propertyId,
  //       );

  //       setProperties(updatedProperties);

  //       toast.success("Property deleted successfully");
  //     } else {
  //       toast.error("Failed to delete property");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Failed to delete property");
  //   }
  // };

  // ログインしているユーザーに関連付けられたプロパティをサーバーから取得
  // ユーザーIDをパラメータとしてAPIエンドポイントにリクエストを送り、そのユーザーのプロパティ情報を取得
  useEffect(() => {
    const fetchUserProperties = async (cat: SessionTypes) => {
      const { id } = cat;
      if (!id) return;

      try {
        // GET リクエスト (このURLのAPIデータは route.ts で取得している)
        const res = await fetch(`/api/tickets/user/${id}`);
        // 成功時
        if (res.status === 200) {
          const data = await res.json();
          setProperties(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    // Fetch user properties only when session is available
    if (session?.user) {
      fetchUserProperties(session.user);
    }
  }, [session]);

  // console.log(properties);

  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24">
        {loading && <SpinnerClient />}
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mx-20 mt-10">
              <div className="mb-4">
                <Image
                  className="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0"
                  src={profileImage || "/images/default_icon.png"}
                  alt="User"
                  width={200}
                  height={200}
                  priority
                />
              </div>
              <h2 className="text-2xl mb-4">
                <span className="font-bold block">Name: </span>
                {profileName}
              </h2>
              <h2 className="text-2xl">
                <span className="font-bold block">Email: </span>
                {profileEmail}
              </h2>
            </div>

            <div className="md:w-3/4 md:pl-4">
              <h2 className="text-xl font-semibold mb-4">Your Listings</h2>

              {/* プロパティーがない場合 */}
              {!loading && properties.length === 0 && (
                <p className="text-gray-600">
                  You have no properties listed yet
                </p>
              )}

              {/* プロパティーがある場合 */}
              {loading ? (
                <div className="flex items-center justify-center w-56 h-56 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              ) : (
                properties.map((property: any) => (
                  <div key={property._id} className="mb-10">
                    <Link href={`/properties/${property._id}`}>
                      <Image
                        className="h-32 w-full rounded-md object-cover"
                        src={property.images[0] || "/images/properties/a1.jpg"}
                        alt={property.name}
                        width={800}
                        height={500}
                        priority
                      />
                    </Link>
                    <div className="mt-2">
                      <p className="text-lg font-semibold">{property.name}</p>
                      <p className="text-gray-600">
                        Address: {property.location.street}{" "}
                        {property.location.city} {property.location.state}{" "}
                      </p>
                    </div>
                    <div className="mt-2">
                      {/* EDIT Button */}
                      <Link
                        href={`/properties/${property._id}/edit`}
                        className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
                      >
                        Edit
                      </Link>
                      {/* DELETE Button */}
                      {/* <button
                        onClick={() => handleDeleteProperty(property._id)}
                        className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                        type="button"
                      >
                        Delete
                      </button> */}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
