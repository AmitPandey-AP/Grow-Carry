import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      ref: "user",
    },
    items: {
      type: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
          },
          quantity: { type: Number, required: true },
        },
      ],
    },
    amount: { type: Number, required: true },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "Address",
    },
    status: {
      type: String,
      default: "Order Placed",
    },
    paymentType: {
      type: String,
      required: true,
    },
    isPaid: {
      type: String,
      default: false,
    },
  },
  { timestamps: true }
);

const Orders = mongoose.models.Orders || mongoose.model("Orders", orderSchema);

export default Orders;
