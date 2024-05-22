import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  image: {
    type: String,
    required: [true, "Images are required"],
  },
  category: {
    type: String,
    required: [true, "Category is required"],
  },
});

const Product = models.Product || model("Product", ProductSchema);
export default Product;
