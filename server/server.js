require('dotenv').config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Routers
const authRouter = require("./routes/auth/auth-routes");
const adminProductsRouter = require("./routes/admin/products-routes");
const adminOrderRouter = require("./routes/admin/order-routes");
const shopProductsRouter = require("./routes/shop/products-routes");
const shopCartRouter = require("./routes/shop/cart-routes");
const shopAddressRouter = require("./routes/shop/address-routes");
const shopOrderRouter = require("./routes/shop/order-routes");
const shopSearchRouter = require("./routes/shop/search-routes");
const shopReviewRouter = require("./routes/shop/review-routes");
const commonFeatureRouter = require("./routes/common/feature-routes");

// MySQL DB setup
const db = require("./models"); // imports sequelize + models
const bcrypt = require('bcryptjs'); // For password hashing

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

// API Routes
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/orders", adminOrderRouter);
app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);
app.use("/api/common/feature", commonFeatureRouter);

// Create First Admin function
const createFirstAdmin = async () => {

    const existingAdmin = await db.User.findOne({ where: { role: 'admin' } });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12);

      await db.User.create({
        userName: process.env.ADMIN_USERNAME,
        email: process.env.ADMIN_EMAIL.toLowerCase(),
        number: process.env.ADMIN_NUMBER,
        password: hashedPassword,
        role: 'admin',
      });

      console.log('Admin created!');
    }
};

// Sync DB and start server
db.sequelize.sync()
  .then(async () => {
    console.log("MySQL DB connected & synced.");
    await createFirstAdmin(); // Check and create the first admin if not exists
    app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("DB sync error: ", err);
  });
