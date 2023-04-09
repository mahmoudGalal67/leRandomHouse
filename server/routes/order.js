const express = require("express");
const {
  addOrder,
  addProducts,
  getOrderProduts,
  getOrderInfo,
  setAsDelivred,
  deleteOrderInfo,
  deleteOrderProducts,
} = require("../controllers/order.js");

const router = express.Router();

router.get("/getInfo", getOrderInfo);
router.get("/getProducts/:orderId", getOrderProduts);
router.post("/addInfo", addOrder);
router.post("/addProducts", addProducts);
router.put("/update/:id", setAsDelivred);
router.delete("/orderInfo/:id", deleteOrderInfo);
router.delete("/orderProducts/:id", deleteOrderProducts);

module.exports = router;
