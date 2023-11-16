import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.mongodb);

const db = mongoose.connection;

db.on("connected", () => {
  console.log(`Database Connection Established`);
});

db.on("error", (err) => {
  console.log(`Database Connection Error ${err.message}`);
});

export default mongoose;
