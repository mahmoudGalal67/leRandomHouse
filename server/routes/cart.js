const express = require("express");
const {
  addCart,
  getCart,
  deleteCartItem,
  deleteCartProduct,
  deleteCartUser,
} = require("../controllers/cart.js");

const router = express.Router();

router.get("/:userId", getCart);
router.post("/:userId", addCart);
router.delete("/:id/:userId", deleteCartItem);
router.delete("/:id", deleteCartProduct);
router.delete("/order/user/:userId", deleteCartUser);

module.exports = router;
