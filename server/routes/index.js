const express = require('express');
const router = express.Router();

const todoRoute = require('./todoRoute');
router.use('/todo', todoRoute);

module.exports = router;
