const { db } = require("../DB.js");

const getWishlist = async (req, res) => {
  const q = "SELECT * FROM wishlist WHERE userId = ?";
  try {
    db.query(q, [req.params.userId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  } catch (err) {
    res.status(400).send(err);
  }
};
const addWishlist = async (req, res) => {
  const q =
    "INSERT INTO wishlist(`id`,`userId`,`title` ,`desc`,`price`,`image`,`type`,`category`) VALUES (?)";
  const wishlist = [
    req.body.id,
    req.params.userId,
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.image,
    req.body.type,
    req.body.category,
  ];
  try {
    db.query(q, [wishlist], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.send(data);
    });
  } catch (err) {
    res.status(401).send(err);
  }
};
const deleteWishlistItem = async (req, res) => {
  const q = "DELETE FROM wishlist WHERE `id` = ? AND userId = ?";
  try {
    db.query(q, [req.params.id, req.params.userId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.send("wish list item deleted");
    });
  } catch (err) {
    res.status(401).send(err);
  }
};

const deleteWishlistProduct = async (req, res) => {
  const q = "DELETE FROM wishlist WHERE `id` = ?";
  try {
    db.query(q, [req.params.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.send("wish list product deleted");
    });
  } catch (err) {
    res.status(401).send(err);
  }
};

module.exports = {
  getWishlist,
  addWishlist,
  deleteWishlistItem,
  deleteWishlistProduct,
};
