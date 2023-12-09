const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messages.js");

router.get("/", messageController.get);
router.get("/:id", messageController.getById);
router.post("/", messageController.create);
router.put("/:id", messageController.edit);
router.delete("/id", messageController.remove)


module.exports = router;
