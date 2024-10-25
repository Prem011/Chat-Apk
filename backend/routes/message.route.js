const { sendMessage, getMessages } = require('../controller/message.controller');
const secureRoute = require('../middleware/secureRoute');

const express = require('express');

const router = express.Router();

router.post("/send/:id", secureRoute, sendMessage)
router.get("/get/:id", secureRoute, getMessages)

module.exports = router;