const express = require("express");
const cors = require("cors");
const path = require("path");
const multer = require("multer");

const authRouter = require("./routes/auth.js");
const productsRouter = require("./routes/product.js");
const cartRouter = require("./routes/cart.js");
const wishlistRouter = require("./routes/wishlist.js");
const ordersRoute = require("./routes/order.js");

const { verifyAdmin } = require("./midlleware/verifyDashboard.js");

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, req.body.name);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 52428800, fieldSize: 52428800 },
});
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    res.send("file uploaded");
  } catch (err) {
    res.send(err);
  }
});

// app.post("/api/uploads", upload.array("files", 10), function (req, res, err) {
//   try {
//     res.end();
//   } catch (err) {
//     res.send(err);
//   }
// });

app.get("/", (req, res) => {
  res.send("working");
});

app.get("/admin", verifyAdmin);

app.use("/auth", authRouter);
app.use("/products", productsRouter);
app.use("/cart", cartRouter);
app.use("/wishlist", wishlistRouter);
app.use("/orders", ordersRoute);

app.listen(5000, () => {
  console.log("Connected!");
});
