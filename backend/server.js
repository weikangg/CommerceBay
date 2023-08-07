import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const port = process.env.PORT || 5000;
connectDB();
const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Cookie parser middleware
app.use(cookieParser());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/uploads", uploadRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve(); // Set __dirname to current directory
  app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
  // Set frontend/build as a static folder
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  // Any route that is not an api route, will be redirected to index.html
  const root = path.join(__dirname, '..', 'frontend', 'build', 'index.html')
    
  app.get('*', (req, res) => {
      res.sendFile(path.resolve(root) , 'index.html')
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
