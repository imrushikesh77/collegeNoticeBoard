const Notice = require("../models/notice.model.js");
const User = require("../models/user.model.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const SECRET_KEY = process.env.SECRET_KEY;

const getLogin = async(req,res) => {
    try {
        let token = req.cookies.access_token;
        let user = jwt.verify(token, SECRET_KEY);
        if (token && user.role !== "admin") {
          return res.redirect("/teacher/dashboard");
        } else {
          return res.render("login.ejs");
        }
      } catch (error) {
        console.log("Error in get login",error.message);
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
  
      return res.cookie("access_token", token).redirect("/teacher/dashboard");
    } catch (error) {
      console.log("Error in post login",error.message);
      return res.status(500).render("login.ejs");
    }
};

const getDashboard = async(req,res) => {
    try {
        let token = req.cookies.access_token;
        let user = jwt.verify(token, SECRET_KEY);
        if (token && user.role !== "admin") {
            let noticesByMe = await Notice.find({author: user._id}).sort({ createdAt: -1});
            let noticesForMe = await Notice.find(
                {
                    forRole: {
                    $in: [user.role]
                    },
                    forDepartment: {
                    $in: [user.department]
                    }
                }
            ).sort({ createdAt: -1});
            let users = await User.find({createdBy: user._id}).sort({ createdAt: -1});
            let noticesByMeCount = await Notice.countDocuments({author: user._id});
            let noticesForMeCount = await Notice.countDocuments(
                {
                    forRole: {
                    $in: [user.role]
                    },
                    forDepartment: {
                    $in: [user.department]
                    }
                }
            );
            let userCount = await User.countDocuments({createdBy: user._id});
            return res.render("teacherDashboard.ejs",{noticesByMe,noticesForMe,noticesByMeCount,noticesForMeCount});
        } else {
          return res.redirect("/teacher/login");
        }
      }
        catch (error) {
            console.log("Error in get dashboard",error.message);
            return res.redirect("/teacher/login");
        }   
}

const getLogout = (req,res) => {
    res.clearCookie("access_token");
    return res.redirect("/teacher/login");
}

module.exports = {
    getLogin,
    postLogin,
    getDashboard,
    getLogout
};