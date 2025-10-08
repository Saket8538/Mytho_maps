import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

console.log("Testing MongoDB Connection...");
console.log("MONGO_URL:", process.env.MONGO_URL ? "✓ Found" : "✗ Not found");
console.log("JWT_SECRET:", process.env.JWT_SECRET ? "✓ Found" : "✗ Not found");
console.log("PORT:", process.env.PORT || "3050");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("✓ Database connected successfully!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("✗ Database connection failed:");
    console.error(err.message);
    process.exit(1);
  });
