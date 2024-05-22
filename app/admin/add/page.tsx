"use client";
import { useState, useEffect, FormEvent, useCallback } from "react";
import { useRouter } from "next/navigation";
import AdminForms from "@/components/features/Admin/AdminForms";
import { toast } from "react-toastify";
// コンテキストから httpOnly のログイン状態を取得
import { useGlobalContext } from "@/context/GlobalContext";

type Fields = {
  userId: string;
  name: string;
  description: string;
  location: {
    street: string;
    city: string;
    state: string;
    postcode: string;
  };
  price: number;
  images: File[];
  status: string;
  date: string;
  venue: string;
  [key: string]: any; // Adding an index signature
};
const AddPage = () => {
  // MongoDBでユーザー登録時に生成されたユーザーIDを取得
  const { user }: any = useGlobalContext();
  // console.log("User ID:", user?.userID);

  const router = useRouter();
  const [sendLoading, setSendLoading] = useState<boolean>(false);
  // server と client のHTMLの不一致を監視
  const [mounted, setMounted] = useState(false);
  // ⬇︎ サーバーに送信するデータを格納するためのstate
  const [fields, setFields] = useState<Fields>({
    userId: user?.userID || "", // mongoDB で生成されたユーザーID
    name: "",
    description: "",
    location: {
      street: "Street",
      city: "melbourne",
      state: "vic",
      postcode: "3100",
    },
    price: 100,
    images: [],
    status: "active",
    date: "2022-12-01",
    venue: "",
    // isFeatured: true,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  //! 入力フォーム
  const handleChange = useCallback((e: React.FormEvent) => {
    const { name, value } = e.target as HTMLInputElement;

    if (name.includes(".")) {
      const [cat, koro] = name.split(".");
      setFields((prev): any => ({
        ...prev,
        [cat]: {
          ...prev[cat],
          [koro]: value,
        },
      }));
    } else {
      setFields((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  }, []);

  //! POST data
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSendLoading(true);

    // Create a new FormData instance to send to server
    const formData = new FormData();
    formData.append("userId", fields.userId);
    formData.append("name", fields.name);
    formData.append("description", fields.description);
    formData.append("price", fields.price.toString());
    formData.append("status", fields.status);
    formData.append("date", fields.date);
    formData.append("venue", fields.venue);
    formData.append("location.street", fields.location.street);
    formData.append("location.city", fields.location.city);
    formData.append("location.state", fields.location.state);
    formData.append("location.postcode", fields.location.postcode);
    // fields.images が FileList または File[] であることを確認し追加
    if (fields.images && fields.images.length) {
      for (let i = 0; i < fields.images.length; i++) {
        formData.append("images", fields.images[i]);
      }
    }

    try {
      const response = await fetch("/api/tickets", {
        method: "POST",
        credentials: "include", // Include cookies
        body: formData, // Use the freshly populated FormData instance
      });

      if (!response.ok) {
        toast.error("Failed to add ticket");
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      console.log("Ticket added:", result);
      toast.success("Ticket added successfully");
      router.push("/admin");
    } catch (error) {
      console.error("Error submitting the form:", error);
      toast.error("Failed to add ticket");
    } finally {
      setSendLoading(false);
    }
  };

  //! Image (File)
  const handleImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { files } = e.target;

      if (files) {
        const fileListArray = Array.from(files);
        const updatedImages = [...fields.images, ...fileListArray];

        setFields((prev): any => ({
          ...prev,
          images: updatedImages,
        }));
      }
    },
    [fields.images],
  );

  return (
    mounted && (
      <AdminForms
        fields={fields}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleImageChange={handleImageChange}
        sendLoading={sendLoading}
        pageTitle="Add Ticket"
        pageBtnText="Add Ticket"
        imgRequired={true}
      />
    )
  );
};

export default AddPage;
