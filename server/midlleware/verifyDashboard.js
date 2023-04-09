const bcrypt = require("bcryptjs");

const verifyAdmin = async (req, res) => {
  if (!req.headers.verify) return res.send(req.headers);
  const verify = bcrypt.compareSync("verifyAdmin", req.headers.verify);
  if (verify) {
    res.send({ verify: true });
  } else {
    res.send({ verify: false });
  }
};

module.exports = { verifyAdmin };
