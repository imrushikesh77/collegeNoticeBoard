const express = require('express');
const router = express.Router();
const {
    getLogin,
    postLogin,
    getDashboard,
    getLogout
} = require('../controllers/admin.controller.js');

const {
    getAddNotice,
    postAddNotice,
    deleteNotice,
    updateNotice,
    getUpdateNotice
} = require('../controllers/notice.controller.js');

const {
    getAddUser,
    postAddUser,
    deleteUser,
    updateUser,
    getViewUser
} = require('../controllers/user.controller.js');

const upload = require("../utils/multer.js");

router.route('/login')
        .get(getLogin)
        .post(postLogin);

router.get("/logout", getLogout);

router.get("/dashboard", getDashboard);

router.route("/add-notice")
        .get(getAddNotice)
        .post(upload.single("uploadFile"),postAddNotice);

router.delete("/delete-notice/:id", deleteNotice);

router.get("/update-notice", getUpdateNotice);
router.patch("/update-notice/:id", updateNotice);

router.route("/add-user")
        .get(getAddUser)
        .post(postAddUser);

router.get("/view-users", getViewUser);

router.delete("/delete-user/:id", deleteUser);

router.patch("/update-user/:id", updateUser);

module.exports = router;
