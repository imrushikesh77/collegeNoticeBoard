const express = require('express');
const router = express.Router();

const {postAddNotice, getAddNotice} = require('../controllers/notice.controller.js');

router.route("/add-notice").get(getAddNotice).post(postAddNotice);


module.exports = router;