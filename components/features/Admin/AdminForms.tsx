import { FormEvent, ChangeEvent } from "react";
import GoBackBtn from "@/components/common/GoBackBtn";
import Title from "@/components/common/Title";
// Context (HttpsOnly & Next Auth )
import { useGlobalContext } from "@/context/GlobalContext";
import { useSession } from "next-auth/react";
import Link from "next/link";

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

type AddFormsProps = {
  fields: Fields;
  pageTitle: string;
  pageBtnText: string;
  handleChange: (e: FormEvent<Element>) => void;
  handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: FormEvent<Element>) => Promise<void>;
  sendLoading: boolean;
  imgRequired: boolean;
};

const AdminForms = ({
  fields,
  handleChange,
  handleImageChange,
  handleSubmit,
  sendLoading,
  pageTitle,
  pageBtnText,
  imgRequired,
}: AddFormsProps) => {
  const { user, userLoading }: any = useGlobalContext();
  const { data: session }: any = useSession();

  // Next Auth / HttpOnly Cookie　でログイン確認 (Admin)
  return (!userLoading && user?.isAdmin) || session?.user?.isAdmin ? (
    <section className="max-w-[860px] mx-auto px-10 py-10">
      <GoBackBtn text="Go back " />

      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data" // Images
      >
        <Title>{pageTitle}</Title>

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
            placeholder="Ticket Name"
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
            placeholder="Description"
            value={fields.description}
            onChange={handleChange}
            required
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
            required
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
            required
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
            placeholder="Price"
            value={fields.price}
            required
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
            placeholder="When?"
            value={fields.date}
            required
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
            placeholder="Where the venue"
            value={fields.venue}
            required
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
            Images (Select up to 4 images (max 10MB))
          </label>
          <input
            type="file"
            id="images"
            name="images"
            className={`form_input disabled:opacity-50 not-allowed:cursor-not-allowed`}
            accept="image/*"
            multiple
            onChange={handleImageChange}
            //! Depend on Update or Add Ticket
            {...(imgRequired && { required: true })}
          />
        </div>

        <div>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={sendLoading}
          >
            {sendLoading ? "Loading..." : pageBtnText}
          </button>
        </div>
      </form>
    </section>
  ) : (
    <section className="max-w-[860px] mx-auto px-10 py-[3rem] max-[480px]:pt-0  ">
      <div className="text-center">
        <h1 className="text-3xl my-12 ">Please Login as Admin</h1>
        <Link
          className="py-2 px-4 bg-slate-800 block w-[50%] mx-auto text-white
        hover:scale-105 transition-all duration-300 hover:opacity-75
        "
          href="/login"
        >
          Login
        </Link>
      </div>
    </section>
  );
};

export default AdminForms;
