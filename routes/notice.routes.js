const express = require('express');
const router = express.Router();
const upload = require("../utils/multer.js");

const {
    postAddNotice, 
    getAddNotice, 
    getUpdateNotice,
    updateNotice,
    deleteNotice
} = require('../controllers/notice.controller.js');

router.route("/add-notice").get(getAddNotice).post(upload.any(),postAddNotice);

router.delete("/delete-notice/:id", deleteNotice);

router.get("/update-notice", getUpdateNotice);
router.patch("/update-notice/:id", updateNotice);

router.route("*", (req, res) => {
    return res.send("404 Not Found");
});


module.exports = router;