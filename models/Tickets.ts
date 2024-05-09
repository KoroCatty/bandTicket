import { Schema, model, models } from "mongoose";

const TicketSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    location: {
      street: {
        type: String,
        required: [true, "Street is required"],
      },
      city: {
        type: String,
        required: [true, "City is required"],
      },
      state: {
        type: String,
        required: [true, "State is required"],
      },
      postcode: {
        type: String,
        required: [true, "Postcode is required"],
      },
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    images: {
      type: [String],
      required: [true, "Images are required"],
    },
    status: {
      type: String,
      enum: ["active", "finished", "cancelled"],
      required: [true, "Status is required"],
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    venue: {
      type: String,
      required: [true, "Venue is required"],
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// すでに Ticket というモデルが存在している場合はそれを使い、なければ新しく作成する
const Ticket = models.Ticket || model("Ticket", TicketSchema);

export default Ticket;
