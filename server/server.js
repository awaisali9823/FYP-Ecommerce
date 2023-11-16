import bodyParser from "body-parser";
import express from "express";
import dbConfig from "./config/dbConfig.js";
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import cartRoute from "./routes/cartRoute.js";
import orderRoute from "./routes/orderRoute.js";
import cors from "cors";
import cloudinaryRoute from "./routes/cloudinaryRoute.js";
import cloudinary from "cloudinary";
const app = express();

app.use(bodyParser.json());

app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRoute);

// cloudinary route
app.use("/api/cloudinary", cloudinaryRoute);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`server listen on port ${PORT}`);
});
