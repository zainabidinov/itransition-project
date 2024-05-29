const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authenticateToken = require("../middleware/authenticateToken");

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/current-user", authenticateToken, authController.fetchCurrentUser);
router.get("/users", authenticateToken, authController.fetchAllUsers);
router.put("/block-user/:id", authenticateToken, authController.blockUser);
router.put("/unblock-user/:id", authenticateToken, authController.unblockUser);
router.put("/demote-user/:id", authenticateToken, authController.demoteUser);
router.put("/promote-user/:id", authenticateToken, authController.promoteUser);
router.delete("/delete-user/:id", authenticateToken, authController.deleteUser);

module.exports = router;