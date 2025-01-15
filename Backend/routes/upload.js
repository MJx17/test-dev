const express = require("express");
const router = express.Router();
const multer = require("multer");
const fileController = require("../controller/uploaderController");
const upload = multer({ storage: multer.memoryStorage() });



router.post("/create-file", fileController.createFile);
router.delete("/delete-file", fileController.deleteFile);
router.put("/update-file", fileController.updateFile);
router.get("/read-file", fileController.readFile);
router.get("/list-files", fileController.listFiles);
router.get("/list-folders", fileController.listFolders);
router.post("/duplicate-folder", fileController.duplicateFolder);
router.put("/rename-folder", fileController.renameFolder);
router.post("/upload-files", upload.array("files"), fileController.uploadFiles);

module.exports = router;
