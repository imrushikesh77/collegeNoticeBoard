const Notice = require("../models/notice.model.js");
const User = require("../models/user.model.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const SECRET_KEY = process.env.SECRET_KEY;

const getLogin = async(req,res) => {
    try {
        let token = req.cookies.access_token;
        let user = jwt.verify(token, SECRET_KEY);
        if (token && user.role === "admin") {
          return res.redirect("/admin/dashboard");
        } else {
          return res.render("login.ejs");
        }
      } catch (error) {
        console.log("Error in get login",error.massage);
        return res.render("login.ejs");
      }
}

const postLogin = async(req,res) => {
    const { email, password } = req.body;
    try {
      const existingUser = await userModel.findOne({ email: email });
      if (!existingUser) {
        return res.status(404).render("login.ejs");
      }
      const matchPassword = await bcrypt.compare(password, existingUser.password);
  
      if (!matchPassword) {
        return res.status(404).render("login.ejs");
      }
      const token = jwt.sign(
        {
          name: existingUser.name,
          email: existingUser.email,
          _id: existingUser._id,
            role: existingUser.role,
        },
        SECRET_KEY
      );
  
      return res.cookie("access_token", token).redirect("/admin/dashboard");
    } catch (error) {
      console.log("Error in post login",error.massage);
      return res.status(500).render("login.ejs");
    }
};

const getDashboard = async(req,res) => {
    try {
        let token = req.cookies.access_token;
        let user = jwt.verify(token, SECRET_KEY);
        if (token && user.role === "admin") {
            let noticesByMe = await Notice.find({author: user._id}).sort({ createdAt: -1});
            let allNotices = await Notice.find().sort({ createdAt: -1});
            let noticesByMeCount = noticesByMe.length;
            let allNoticesCount = allNotices.length;
            return res.render("adminDashboard.ejs",{noticesByMe,noticesByMeCount,allNotices,allNoticesCount});
        } else {
          return res.redirect("/admin/login");
        }
      }
        catch (error) {
            console.log("Error in get dashboard",error.massage);
            return res.redirect("/admin/login");
        }   
}

const getLogout = (req,res) => {
    res.clearCookie("access_token");
    return res.redirect("/admin/login");
}

module.exports = {
    getLogin,
    postLogin,
    getDashboard,
    getLogout
};