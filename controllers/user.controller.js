const User = require("../models/user.model.js");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;
const bcrypt = require("bcryptjs");

const getAddUser = async(req,res)=>{
    const token = req.cookies.access_token;
    if(!token){
        return res.redirect("/");
    }
    return res.render("addUser.ejs");
}

const postAddUser = async(req,res)=>{
    try {
        let token = req.cookies.access_token;
        let user = jwt.verify(token, SECRET_KEY);
        if (token) {
            const {name,email,password,department,role} = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({
                name,
                email,
                password: hashedPassword,
                department,
                role,
                createdBy: user._id
            });
            await newUser.save();
            if(user.role === "admin"){
                return res.redirect("/admin/dashboard");
            }
            else{
                return res.redirect("/teacher/dashboard");
            }
        } else {
            return res.redirect("/");
        }
      }
        catch (error) {
            console.log("Error in get add user",error.message);
            return res.redirect("/");
        }
}

const getViewUser = async(req,res)=>{
    try {
        let token = req.cookies.access_token;
        if (token) {
            let user = jwt.verify(token, SECRET_KEY);
            if(user.role === "admin"){
                let usersCreatedByMe = await User.find({createdBy: user._id}).sort({ createdAt: -1});
                let usersCreatedByMeCount = usersCreatedByMe.length;
                let allUsers = await User.find().sort({ createdAt: -1});
                let allUsersCount = allUsers.length;
                return res.render("viewUser.ejs",{usersCreatedByMe,usersCreatedByMeCount,allUsers,allUsersCount});
            }
            else{
                let usersCreatedByMe = await User.find({createdBy: user._id}).sort({ createdAt: -1});
                let usersCreatedByMeCount = usersCreatedByMe.length;
                return res.render("viewUser.ejs",{usersCreatedByMe,usersCreatedByMeCount});
            }
        } else {
            return res.redirect("/");
        }
      }
    catch (error) {
        console.log("Error in view user",error.message);
        return res.redirect("/");
    }
}

const deleteUser = async(req,res)=>{
    try {
        let token = req.cookies.access_token;
        let user = jwt.verify(token, SECRET_KEY);
        if (token) {
            const {id} = req.params;
            await User.findByIdAndDelete(id);
            if(user.role === "admin"){
                return res.redirect("/admin/dashboard");
            }
            else{
                return res.redirect("/teacher/dashboard");
            }
        } else {
            return res.redirect("/");
        }
      }
    catch (error) {
        console.log("Error in delete user",error.message);
        return res.redirect("/");
    }
}

const updateUser = async(req,res)=>{
    try {
        let token = req.cookies.access_token;
        let user = jwt.verify(token, SECRET_KEY);
        if (token) {
            const {id} = req.params;
            const {name,email,password,department,role} = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            await User.findByIdAndUpdate(id,{
                name,
                email,
                password: hashedPassword,
                department,
                role,
                createdBy: user._id
            });
            if(user.role === "admin"){
                return res.redirect("/admin/dashboard");
            }
            else{
                return res.redirect("/teacher/dashboard");
            }
        } else {
            return res.redirect("/");
        }
      }
    catch (error) {
        console.log("Error in update user",error.message);
        return res.redirect("/");
    }
}

module.exports = {
    getAddUser,
    postAddUser,
    deleteUser,
    updateUser,
    getViewUser
};