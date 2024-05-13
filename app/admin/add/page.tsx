"use client";
import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  // server と client のHTMLの不一致を監視
  const [mounted, setMounted] = useState(false);
  const [fields, setFields] = useState<Fields>({
    userId: "151",
    name: "test ticket koro koro",
    description: "test desc ",
    location: {
      street: "Street",
      city: "melbourne",
      state: "vic",
      postcode: "3100",
    },
    price: 100,
    images: [],
    status: "active",
    date: "2022-12-12",
    venue: "test venue",
    // isFeatured: true,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  //! 入力フォーム
  const handleChange = (e: React.FormEvent) => {
    // e.targetをHTMLInputElementに型アサーションして、formのinputからnameとvalueを取得
    const { name, value } = e.target as HTMLInputElement;

    // inputのname属性に'.'が含まれる場合（例：'location.city'）、
    // これはネストされたプロパティを更新しようとしていることを意味する
    if (name.includes(".")) {
      // nameを'.'で分割して、ネストされたオブジェクト名とプロパティ名を取得
      const [cat, koro] = name.split("."); // 例: cat = 'location', koro = 'city'

      // setFieldsを使って、fieldsステートを更新
      setFields((prev): any => ({
        ...prev, // 既存のfieldsオブジェクトを展開して保持
        [cat]: {
          // ネストされたオブジェクト名（例：'location'）でアクセス
          ...prev[cat], // ネストされたオブジェクト内の既存のプロパティを展開して保持
          [koro]: value, // ネストされたプロパティ名（例：'city'）に新しい値をセット
        },
      }));
    } else {
      // '.'が含まれない場合は、ネストされていないプロパティの更新
      setFields((prev) => ({
        ...prev, // 既存のfieldsオブジェクトを展開して保持
        [name]: value, // プロパティ名（例：'type'）に新しい値をセット
      }));
    }
  };

  //! POST data
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

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
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      console.log("Ticket added:", result);
      alert("Ticket added successfully");
      router.push("/admin");
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  //! Image (File)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // ファイル入力からFileListを取得
    const { files } = e.target;

    // filesがnullでないことを確認
    if (files) {
      // FileListをFile[]に変換
      const fileListArray = Array.from(files);

      // Clone Images array
      const updatedImages = [...fields.images, ...fileListArray];

      // add image to state
      setFields((prev): any => ({
        ...prev,
        images: updatedImages,
      }));
    }
  };

  return (
    mounted && (
      <section className="max-w-[860px] mx-auto px-10 py-10">
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data" // Images
        >
          <h2 className="text-3xl text-center font-semibold mb-6">
            Add Ticket
          </h2>

          <div className="mb-4">
            <label htmlFor="status" className="form_label">
              Ticket Status
            </label>
            <select
              id="status"
              name="status"
              className="form_input"
              required
              value={fields.status}
              onChange={handleChange}
            >
              <option value="active">Active</option>
              <option value="finished">Finished</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="form_label">Ticket Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form_input"
              placeholder="eg. Beautiful Apartment In Miami"
              required
              value={fields.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="form_label">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="form_textarea"
              rows={4}
              placeholder="Add an optional description of your ticket"
              value={fields.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="mb-4 bg-slate-800 p-4">
            <label className="form_label">Location</label>
            <input
              type="text"
              id="street"
              name="location.street"
              className="form_input"
              placeholder="Street"
              value={fields.location.street}
              onChange={handleChange}
            />
            <input
              type="text"
              id="city"
              name="location.city"
              className="form_input"
              placeholder="City"
              required
              value={fields.location.city}
              onChange={handleChange}
            />
            <input
              type="text"
              id="state"
              name="location.state"
              className="form_input"
              placeholder="State"
              required
              value={fields.location.state}
              onChange={handleChange}
            />
            <input
              type="text"
              id="postcode"
              name="location.postcode"
              className="form_input"
              placeholder="Postcode"
              value={fields.location.postcode}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="price" className="form_label ">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              className="form_input"
              placeholder="Name"
              value={fields.price}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="date" className="form_label ">
              Date
            </label>
            <input
              type="text"
              id="date"
              name="date"
              className="form_input"
              placeholder="Name"
              value={fields.date}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="venue" className="form_label ">
              Venue
            </label>
            <input
              type="text"
              id="venue"
              name="venue"
              className="form_input"
              placeholder="Name"
              value={fields.venue}
              onChange={handleChange}
            />
          </div>

          {/* <div className="mb-4">
          <label htmlFor="isFeatured" className="form_label">
            Featured Ticket?
          </label>
          <select
            id="isFeatured"
            name="isFeatured"
            className="form_input"
            required
            value={fields.isFeatured}
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div> */}

          <div className="mb-4">
            <label htmlFor="images" className="form_label">
              Images (Select up to 4 images)
            </label>
            <input
              type="file"
              id="images"
              name="images"
              className="form_input"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              required
            />
          </div>

          <div>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Add ticket
            </button>
          </div>
        </form>
      </section>
    )
  );
};

export default AddPage;
