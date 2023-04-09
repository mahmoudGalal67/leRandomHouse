const express = require("express");
const { register, login, forgetPassword } = require("../controllers/auth.js");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgetPassword", forgetPassword);
// router.post("/logout", logout);

module.exports = router;
