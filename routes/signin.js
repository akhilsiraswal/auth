const express = require("express");
const { signup, signout } = require("../controllers/signin");
const router = express.Router();
const { signin } = require("../controllers/signin");

router.post("/signin", signin);
router.post("/signup", signup);
router.get("/signout", signout);
module.exports = router;
