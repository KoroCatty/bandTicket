"use client";
import { useState, useEffect, FormEvent, useCallback } from "react";
import { useRouter } from "next/navigation";
import AdminForms from "@/components/features/Admin/AdminForms";

// APIのドメインを環境変数から取得またはnullを設定
const apiDomain = process.env.NEXT_PUBLIC_DOMAIN || null;

import { useParams } from "next/navigation";
// コンテキストから httpOnly のログイン状態を取得
import { useGlobalContext } from "@/context/GlobalContext";

import type { Ticket } from "@/types/ticket";
import SpinnerClient from "@/components/common/SpinnerClient";

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
  const { adminTicketId }: { adminTicketId: string } = useParams(); // URL ID
  // console.log("adminTicketId:", adminTicketId)
  const [sendLoading, setSendLoading] = useState<boolean>(false);
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);

  // MongoDBでユーザー登録時に生成されたユーザーIDを取得
  const { user }: any = useGlobalContext();
  // console.log("User ID:", user?.userID);

  const router = useRouter();
  // server と client のHTMLの不一致を監視
  const [mounted, setMounted] = useState(false);
  // ⬇︎ サーバーに送信するデータを格納するためのstate
  const [fields, setFields] = useState<Fields>({
    userId: user?.userID || "", // mongoDB で生成されたユーザーID
    name: "",
    description: "",
    location: {
      street: "",
      city: "",
      state: "",
      postcode: "",
    },
    price: 0,
    images: [],
    status: "",
    date: "",
    venue: "",
    // isFeatured: true
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (ticket) {
      setFields({
        userId: user?.userID || "", // mongoDB で生成されたユーザーID
        name: ticket.name,
        description: ticket.description,
        location: {
          street: ticket.location.street,
          city: ticket.location.city,
          state: ticket.location.state,
          postcode: ticket.location.postcode,
        },
        price: ticket.price,
        images: [], // 画像をどうするかは要件次第
        status: ticket.status,
        date: ticket.date,
        venue: ticket.venue,
      });
    }
  }, [ticket, user]);

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

  //! PUT (UPDATE)
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
      const response = await fetch(`/api/tickets/admin/${adminTicketId}`, {
        // const response = await fetch("/api/tickets/admin", {
        method: "PUT",
        credentials: "include", // Include cookies
        body: formData, // Use the freshly populated FormData instance
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      alert("Ticket added successfully");
      router.push("/admin");
    } catch (error) {
      console.error("Error submitting the form:", error);
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

  //!==================================================
  // Ticket 1つの詳細データを取得する関数
  async function fetchTicket(adminTicketId: string) {
    if (!apiDomain) return null;
    try {
      // const response = await fetch(`${apiDomain}/tickets/admin/${adminTicketId}`);
      const response = await fetch(
        `${apiDomain}/tickets/admin/${adminTicketId}`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return response.json();
    } catch (error) {
      console.error("Fetch error:", error);
      return null;
    }
  }

  useEffect(() => {
    const fetchTicketData = async () => {
      if (!adminTicketId) return;
      const ticketData = await fetchTicket(adminTicketId.toString());
      setTicket(ticketData);
      setLoading(false);
    };
    fetchTicketData();
  }, [adminTicketId]);

  if (!ticket && !loading) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10">Ticket Not Found</h1>
    );
  }

  return (
    mounted && (
      <>
        <AdminForms
          fields={fields}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleImageChange={handleImageChange}
          pageTitle="Edit Ticket"
          pageBtnText="UPDATE"
          sendLoading={sendLoading}
          imgRequired={false}
        />
      </>
    )
  );
};

export default AddPage;
