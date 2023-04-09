const express = require("express");
const {
  addWishlist,
  getWishlist,
  deleteWishlistItem,
  deleteWishlistProduct,
} = require("../controllers/wishlist.js");

const router = express.Router();

router.get("/:userId", getWishlist);
router.post("/:userId", addWishlist);
router.delete("/:id/:userId", deleteWishlistItem);
router.delete("/:id", deleteWishlistProduct);

module.exports = router;
