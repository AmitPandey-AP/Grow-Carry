import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./configs/db.js";
import "dotenv/config";
import connectCloudinary from "./configs/cloudinary.js";

import sellerRouter from "./routes/sellerRoute.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import addressRouter from "./routes/addressRoute.js";
import orderRouter from "./routes/orderRoute.js";
import { stripeWebHooks } from "./controllers/orderController.js";

const app = express();
const port = process.env.PORT || 4000;

// configs
await connectDB();
await connectCloudinary();

// allow multiple origins
const allowedOrigins = ["http://localhost:5173","https://growcarry.vercel.app"];

// stripe webhook thing -> for verification of payment
app.post(
  "/stripe",
  express.raw({
    type: "application/json",
  }),
  stripeWebHooks
);

// Middleware configration

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

app.get("/", (req, res) => {
  res.send("API is working");
});

app.use("/api/user", userRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRouter);

app.listen(port, () => {
  console.log(`server is Running on http://localhost:${port}`);
});
