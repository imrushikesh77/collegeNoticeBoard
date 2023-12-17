const Notice = require("../models/notice.model.js");
const uuidv4 = require("uuid").v4;

const getAddNotice = async(req, res) => {
    try {
        let token = req.cookies.access_token;
        if (token) {
            return res.render("addNotice.ejs");
        } else {
            return res.redirect("/");
        }
    } catch (error) {
        console.log("Error in get add notice", error.message);
        return res.redirect("/");
    }
}

const postAddNotice = async(req, res) => {
    try {
        let token = req.cookies.access_token;
        let user = jwt.verify(token, SECRET_KEY);
        if (token) {
            let noticeDownloadLink = "";
            if (req.file) {
                noticeDownloadLink = req.protocol + "://" + req.header.host + "/noticeFiles/" + req.file.filename;
            }
            const noticeID = uuidv4();
            let noticeDeleteLink = req.protocol + "://" + req.header.host + "/delete-notice/" + noticeID;
            const { title, description } = req.body;
            const newNotice = new Notice({
                title,
                description,
                notice_id: noticeID,
                download: noticeDownloadLink,
                noticeDeleteLink,
                author: user._id,
                forRole: req.body.forRole,
                forDepartment: req.body.forDepartment
            });
            await newNotice.save();
            if (user.role === "admin") {
                return res.redirect("/admin/dashboard");
            } else {
                return res.redirect("/teacher/dashboard");
            } 
        } else {
            return res.redirect("/");
        }
    } catch (error) {
        console.log("Error in post add notice", error.message);
        return res.redirect("/");
    }
}

const deleteNotice = async(req, res) => {
    try {
        let token = req.cookies.access_token;
        let user = jwt.verify(token, SECRET_KEY);
        if (token) {
            const { id } = req.params;
            await Notice.findByIdAndDelete(id);
            if (user.role === "admin") {
            return res.redirect("/admin/dashboard");
            }
            else {
            return res.redirect("/teacher/dashboard");
            }
        } else {
            return res.redirect("/");
        }
    } catch (error) {
        console.log("Error in delete notice", error.message);
        return res.redirect("/");
    }
}

const getUpdateNotice = async(req, res) => {
    try {
        let token = req.cookies.access_token;
        if (token) {
            return res.render("addNotice.ejs");
        } else {
            return res.redirect("/");
        }
    } catch (error) {
        console.log("Error in get add notice", error.message);
        return res.redirect("/");
    }
}


const updateNotice = async(req, res) => {
    try {
        let token = req.cookies.access_token;
        let user = jwt.verify(token, SECRET_KEY);
        if (token) {
            let noticeDownloadLink = "";
            if (req.file) {
                noticeDownloadLink = req.protocol + "://" + req.header.host + "/noticeFiles/" + req.file.filename;
            }
            const noticeID = uuidv4();
            let noticeDeleteLink = req.protocol + "://" + req.header.host + "/delete-notice/" + noticeID;
            const { title, description } = req.body;
            const newNotice = new Notice({
                title,
                description,
                notice_id: noticeID,
                download: noticeDownloadLink,
                noticeDeleteLink,
                author: user._id,
                forRole: req.body.forRole,
                forDepartment: req.body.forDepartment
            });
            await newNotice.save();
            if (user.role === "admin") {
                return res.redirect("/admin/dashboard");
            } else {
                return res.redirect("/teacher/dashboard");
            } 
        } else {
            return res.redirect("/");
        }
    } catch (error) {
        console.log("Error in post add notice", error.message);
        return res.redirect("/");
    }
}

module.exports = {
    getAddNotice,
    postAddNotice,
    deleteNotice,
    updateNotice,
    getUpdateNotice
};