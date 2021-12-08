import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import morgan from "morgan";
import passport from "passport";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

// Load env vars
dotenv.config({ path: "./backend/config/.env" });

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Connect DB
connectDB();

//auth JWT- passport init
app.use(passport.initialize());

//Mount Routers
app.use("/v1/api/users", userRoutes);
app.use("/v1/api/admin", adminRoutes);

//Connect to Server
const PORT = process.env.PORT || 5000;
const environment = process.env.NODE_ENV;

app.listen(
  PORT,
  console.log(`Server Running on PORT: ${PORT}, on ${environment} mode`)
);
