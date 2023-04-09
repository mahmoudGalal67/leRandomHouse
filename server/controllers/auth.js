const { db } = require("../DB.js");

const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  // CHECK EXISTING USER
  const q = "SELECT * FROM users WHERE email = ?";

  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exists!");

    // Hash the password and create a user
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const q =
      "INSERT INTO users(`firstName`,`lastName` ,`email`,`password` ) VALUES (?)";
    const values = [
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      hash,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("user has been added");
    });
  });
};

const login = async (req, res) => {
  //CHECK USER

  const q = "SELECT * FROM users WHERE email = ?";

  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    if (data[0].email === "test@gmail") {
      const isPasswordCorrect = bcrypt.compareSync(
        req.body.password,
        data[0].password
      );

      if (!isPasswordCorrect) return res.status(400).json("Wrong password!");

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync("verifyAdmin", salt);

      const { password, ...other } = data[0];

      return res.status(200).json({ ...other, verify: hash });
    }

    // Check password
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!isPasswordCorrect) return res.status(400).json("Wrong password!");

    const { password, ...other } = data[0];

    res.status(200).json(other);
  });
};

const logout = (req, res) => {
  // clear local storage
};

const forgetPassword = async (req, res) => {
  const q = "SELECT * FROM users WHERE email = ?";
  try {
    db.query(q, [req.body.email], (err, data) => {
      if (err) return res.status(401).json(err);
      if (data.length === 0) {
        return res.status(401).json("User not found");
      }
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.newPassword, salt);
      const update = "UPDATE users SET `password`=? WHERE `email` = ?";
      db.query(update, [hash, req.body.email], (err, data) => {
        if (err) return res.status(401).json(err);
        res.send("user has been updated");
      });
    });
  } catch (err) {
    res.status(401).send(err);
  }
};

module.exports = { register, login, forgetPassword };
