const { db } = require("../DB.js");

const addProduct = async (req, res) => {
  const qp =
    "INSERT INTO products(`title`,`desc` ,`price`,`type` , `category`,`image`,`new`) VALUES (?)";

  const productValues = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.type,
    req.body.category,
    req.body.image,
    req.body.new,
  ];

  db.query(qp, [productValues], (err, dataP) => {
    if (err) return res.status(500).json(err);
    res.json(dataP.insertId);
  });
};

const addGiftAndFragrance = async (req, res) => {
  const qp =
    "INSERT INTO gifts(`title`,`desc` ,`price`, `category`,`image`,`type`,`new`) VALUES (?)";

  const giftValues = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.category,
    req.body.image,
    "gifts",
    req.body.new,
  ];

  db.query(qp, [giftValues], (err, dataP) => {
    if (err) return res.status(500).json(err);
    res.json(dataP.insertId);
  });
};

const addProductcolors = (req, res) => {
  const qc = "INSERT INTO colors(`productId`,`color`) VALUES (?)";

  db.query(qc, [[req.body.productId, req.body.color]], (err, dataS) => {
    if (err) return res.status(500).json(err);
    res.status(201).json("ok");
  });
};

const addProductimages = (req, res) => {
  const qc = "INSERT INTO images(`productId`,`image`,`color`) VALUES (?)";

  db.query(
    qc,
    [[req.body.productId, req.body.image, req.body.color]],
    (err, dataS) => {
      if (err) return res.status(500).json(err);
      res.status(201).json("ok");
    }
  );
};

const addProductsizes = (req, res) => {
  const qc = "INSERT INTO sizes(`productId`,`size`) VALUES (?)";

  db.query(qc, [[req.body.productId, req.body.size]], (err, dataS) => {
    if (err) return res.status(500).json(err);
    res.status(201).json("ok");
  });
};

const productType = async (req, res) => {
  let { type } = req.query;
  let q;
  if (type === "gifts") {
    q = "SELECT * FROM gifts WHERE type = ?";
  } else if (type === "new") {
    q =
      "SELECT * FROM products WHERE new =? UNION SELECT * FROM gifts WHERE new =? ";
    type = true;
  } else {
    q = "SELECT * FROM products WHERE type = ?";
  }
  db.query(q, [type, true], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.send(data);
  });
};

const productCategory = async (req, res) => {
  const { type, category } = req.query;
  let q;
  if (type === "gifts") {
    q = "SELECT * FROM gifts WHERE type = ? AND category = ?";
  } else {
    q = "SELECT * FROM products WHERE type = ? AND category = ?";
  }
  db.query(q, [type, category], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.send(data);
  });
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  const q = "SELECT * FROM products WHERE id = ?";
  db.query(q, [id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.send(data[0]);
  });
};

const getGift = async (req, res) => {
  const { id } = req.params;
  const q = "SELECT * FROM gifts WHERE id = ?";
  db.query(q, [id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.send(data[0]);
  });
};

const productColors = async (req, res) => {
  const { id } = req.params;
  const q = "SELECT * FROM colors WHERE productId = ?";
  db.query(q, [id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.send(data);
  });
};

const productImages = async (req, res) => {
  const { id } = req.params;
  const q = "SELECT * FROM images WHERE productId = ?";
  db.query(q, [id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.send(data);
  });
};

const productSizes = async (req, res) => {
  const { id } = req.params;
  const q = "SELECT * FROM sizes WHERE productId = ?";
  db.query(q, [id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.send(data);
  });
};

const deleteProduct = async (req, res) => {
  let q;
  if (req.query.type === "gifts") {
    q = "DELETE FROM gifts WHERE `id` = ?";
  } else {
    q = "DELETE FROM products WHERE `id` = ? ";
  }
  try {
    db.query(q, [req.params.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.send("item has been deleted");
    });
  } catch (err) {
    res.status(401).send(err);
  }
};

const deleteColors = async (req, res) => {
  if (req.query.type === "gifts") {
    return res.send("ok");
  }
  const q = "DELETE FROM colors WHERE `productId` = ? ";
  try {
    db.query(q, [req.params.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.send("colors have been deleted");
    });
  } catch (err) {
    res.status(401).send(err);
  }
};

const deleteSizes = async (req, res) => {
  if (req.query.type === "gifts") {
    return res.send("ok");
  }
  const q = "DELETE FROM sizes WHERE `productId` = ? ";
  try {
    db.query(q, [req.params.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.send("sizes have been deleted");
    });
  } catch (err) {
    res.status(401).send(err);
  }
};

const deleteImages = async (req, res) => {
  if (req.query.type === "gifts") {
    return res.send("ok");
  }
  const q = "DELETE FROM images WHERE `productId` = ? ";
  try {
    db.query(q, [req.params.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.send("images have been deleted");
    });
  } catch (err) {
    res.status(401).send(err);
  }
};

module.exports = {
  addGiftAndFragrance,
  addProduct,
  addProductcolors,
  addProductimages,
  addProductsizes,
  productCategory,
  productColors,
  productImages,
  productSizes,
  productType,
  getGift,
  getProduct,
  deleteColors,
  deleteImages,
  deleteProduct,
  deleteSizes,
};
