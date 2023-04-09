const { db } = require("../DB.js");

const addOrder = async (req, res) => {
  const qp =
    "INSERT INTO orderinfo(`name`,`email` ,`phone`,`adresse` , `country`,`city`,`totalPrice`,`zipCode`,`villa`,`villaNumber`,`countryCode`) VALUES (?)";

  const orderInfo = [
    req.body.name,
    req.body.email,
    req.body.phone,
    req.body.adresse,
    req.body.country,
    req.body.city,
    req.body.totalPrice,
    req.body.zipCode,
    req.body.villa,
    req.body.villaNumber,
    req.body.countryCode,
  ];

  db.query(qp, [orderInfo], (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data.insertId);
  });
};

const addProducts = async (req, res) => {
  const qp =
    "INSERT INTO orderproducts(`orderId`,`title` ,`desc`,`price` , `image`,`size`,`color`) VALUES (?)";

  const orderProducts = [
    req.body.orderId,
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.image,
    req.body.size,
    req.body.color,
  ];

  db.query(qp, [orderProducts], (err, data) => {
    if (err) return res.status(500).json(err);
    res.json("orderProducts has been added");
  });
};

const getOrderInfo = async (req, res) => {
  const q = "SELECT * FROM orderinfo ORDER BY delivred ";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.send(data);
  });
};

const getOrderProduts = async (req, res) => {
  const q = "SELECT * FROM orderproducts WHERE orderId = ?";
  db.query(q, [req.params.orderId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.send(data);
  });
};

const setAsDelivred = async (req, res) => {
  const q = "UPDATE orderinfo SET `delivred`=? WHERE `id` = ?";
  db.query(q, [true, req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.send("order has been updated");
  });
};

const deleteOrderInfo = async (req, res) => {
  const q = "DELETE FROM orderinfo WHERE `id` = ?";
  try {
    db.query(q, [req.params.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.send("order info deleted");
    });
  } catch (err) {
    res.status(401).send(err);
  }
};

const deleteOrderProducts = async (req, res) => {
  const q = "DELETE FROM orderproducts WHERE `orderId` = ?";
  try {
    db.query(q, [req.params.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.send("order products deleted");
    });
  } catch (err) {
    res.status(401).send(err);
  }
};

module.exports = {
  addOrder,
  addProducts,
  getOrderInfo,
  getOrderProduts,
  setAsDelivred,
  deleteOrderInfo,
  deleteOrderProducts,
};
