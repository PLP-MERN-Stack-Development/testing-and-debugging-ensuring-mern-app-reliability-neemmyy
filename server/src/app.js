import express from "express";
import bugRoutes from "./routes/bugs.js";

const app = express();

app.use(express.json());
app.use("/api/bugs", bugRoutes);

export default app;
