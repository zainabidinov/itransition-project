const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");
const authenticateToken = require("../middleware/authenticateToken");


router.get("/fetch-items/:collectionId", authenticateToken, itemController.getItemsByCollection);
router.post("/create-item/:collectionId", authenticateToken, itemController.createItem);

module.exports = router;
