import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Fix for ES Module __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") }); // ✅ Load `.env` first


import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

// console.log("REDIS_URL from .env:", process.env.UPSTASH_REDIS_URL);





//routes
import  authRoutes from "./routes/auth.route.js"
import productRoutes from "./routes/products.route.js"
import cartRoutes from "./routes/cart.route.js"
import couponRoutes from "./routes/coupon.route.js"
import paymentRoutes from "./routes/payment.route.js"

import {connectDB } from "./lib/db.js"





const app = express();
const PORT = (process.env.PORT );

app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );
app.use(express.json({limit: "10mb"})); // allows you to parse the body of the request
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());


//authorization
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/coupon", couponRoutes);
app.use("/api/payment", paymentRoutes);

app.listen(PORT, ()=>{
    console.log(`Server is running on the PORT http://localhost:${PORT}`);

    connectDB();
});




// xWkUSSZbjLuwZeND 
