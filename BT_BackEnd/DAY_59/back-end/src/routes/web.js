const express = require("express");
const sendMailController = require("../controllers/sendMail.controller");
const router = express.Router();

router.post("/send-mail", sendMailController.sendMail);
router.get("/history", sendMailController.getHistory);
router.get("/history/:id", sendMailController.getHistoryById);
module.exports = router;
