const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messages.js");

router.get("/", messageController.get);
router.post("/", messageController.create);


module.exports = router;
