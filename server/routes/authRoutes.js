const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authenticateToken = require("../middleware/authenticateToken");

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/fetch-current-user", authenticateToken, authController.fetchCurrentUser);

module.exports = router;