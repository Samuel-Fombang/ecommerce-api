import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db";

// 👤 USERS
import userRoutes from "./routes/userRoutes";

// 🏷️ CATEGORIES
import categoryRoutes from "./routes/categoryRoutes";

// 📦 PRODUCTS
import productRoutes from "./routes/productRoutes";

// 🟣 ORDERS
import orderRoutes from "./routes/orderRoutes";

// 📘 SWAGGER
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger";

dotenv.config();

// 1️⃣ CREATE APP
const app = express();

// 2️⃣ MIDDLEWARE
app.use(cors());
app.use(express.json());

// 3️⃣ ROUTES
app.use("/users", userRoutes);
app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

// 4️⃣ SWAGGER DOCS
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 5️⃣ TEST ROUTE
app.get("/", (req, res) => {
  res.send("🚀 Ecommerce API is running!");
});

// 6️⃣ PORT
const PORT = process.env.PORT || 5001;

// 7️⃣ START SERVER AFTER DB CONNECTS
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log(`Swagger Docs: http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed", err);
  });

export default app;