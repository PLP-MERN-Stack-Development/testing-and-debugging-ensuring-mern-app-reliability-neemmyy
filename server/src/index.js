import mongoose from "mongoose";
import app from "./app.js";

const PORT = 5000;

mongoose
  .connect("mongodb://localhost:27017/bugtracker")
  .then(() => {
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log("Server running on port 5000");
    });
  })
  .catch((err) => {
    console.error("DB connection failed", err);
  });
