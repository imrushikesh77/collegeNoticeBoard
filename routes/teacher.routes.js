const express = require('express');
const router = express.Router();

const {
    getLogin,
    postLogin,
    getDashboard,
    getLogout
} = require('../controllers/teacher.controller.js');

const {
    getAddNotice,
    postAddNotice,
    deleteNotice,
    updateNotice
} = require('../controllers/notice.controller.js');

const {
    getAddUser,
    postAddUser,
    deleteUser,
    updateUser,
    getViewUser
} = require('../controllers/user.controller.js');

router.get('/login',getLogin).post('/login',postLogin);

router.get("/logout",getLogout);

router.get("/dashboard",getDashboard);

router.get("/add-notice",getAddNotice).post("/add-notice",postAddNotice);

router.delete("/delete-notice/:id",deleteNotice);

router.patch("/update-notice/:id",updateNotice);

router.get("/add-user",getAddUser).post("/add-user",postAddUser);

router.get("/view-user", getViewUser);

router.delete("/delete-user/:id",deleteUser);

router.patch("/update-user/:id",updateUser);



module.exports = router;