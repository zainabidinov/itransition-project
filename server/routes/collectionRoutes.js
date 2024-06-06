const express = require("express");
const router = express.Router();
const collectionController = require("../controllers/collectionController");
const authenticateToken = require("../middleware/authenticateToken");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.get("/my-collections/:userId", authenticateToken, collectionController.getCollectionsByUser);
router.post("/create-collection/:userId",  authenticateToken, collectionController.createCollection);
router.post("/upload-collection-image/:collectionId",  authenticateToken, upload.single("image"), collectionController.uploadCollectionImage);  
router.get("/collection/:collectionId", authenticateToken, collectionController.getCollectionById);

module.exports = router;
