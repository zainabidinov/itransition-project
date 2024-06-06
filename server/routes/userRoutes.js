const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authenticateToken = require("../middleware/authenticateToken");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });


router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.get("/current-user", authenticateToken, userController.fetchCurrentUser);
router.get("/users", authenticateToken, userController.fetchAllUsers);
router.put("/block-user/:id", authenticateToken, userController.blockUser);
router.put("/unblock-user/:id", authenticateToken, userController.unblockUser);
router.put("/demote-user/:id", authenticateToken, userController.demoteUser);
router.put("/promote-user/:id", authenticateToken, userController.promoteUser);
router.delete("/delete-user/:id", authenticateToken, userController.deleteUser);
router.post("/upload-image", authenticateToken, upload.single('image'), userController.uploadImage);

module.exports = router;