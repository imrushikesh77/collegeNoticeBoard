const Notice = require("../models/notice.model.js");
const uuidv4 = require("uuid").v4;
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config("../.env");
const SECRET_KEY = process.env.SECRET_KEY;


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
        console.log("req.params",req.params);
        console.log("req.body",req.body);
        let token = req.cookies.access_token;
        if (token) {
            let user = jwt.verify(token, SECRET_KEY);
            let noticeDownloadLink = "";
            if (req.file) {
                noticeDownloadLink = req.protocol + "://" + req.get("host") + "/noticeFiles/" + req.file.filename;
            }
            else{
                noticeDownloadLink = "-";
            }
            const noticeID = uuidv4();
            let noticeDeleteLink = req.protocol + "://" + req.get("host") + "/notice/delete/" + noticeID;
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
        if (token) {
            let user = jwt.verify(token, SECRET_KEY);
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
        if (token) {
            let user = jwt.verify(token, SECRET_KEY);
            let noticeDownloadLink = "";
            if (req.file) {
                noticeDownloadLink = req.protocol + "://" + req.header.host + "/noticeFiles/" + req.file.filename;
            }
            const updatedFields = {};
            if (req.body.title) {
                updatedFields.title = req.body.title;
            }
            if (req.body.description) {
                updatedFields.description = req.body.description;
            }
            if (req.body.forRole) {
                updatedFields.forRole = req.body.forRole;
            }
            if (req.body.forDepartment) {
                updatedFields.forDepartment = req.body.forDepartment;
            }
            if (req.file) {
                updatedFields.download = noticeDownloadLink;
            }
            const updatedNotice = await Notice.findByIdAndUpdate(req.params.id, updatedFields, {
                new: true,
                runValidators: true
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