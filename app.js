const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const adminRoutes = require("./routes/admin.routes.js");
const teacherRoutes = require("./routes/teacher.routes.js");
const Notice = require("./models/notice.model.js");

app.use(express.json());
app.use(cookieParser());
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.use("/admin",adminRoutes);
app.use("/teacher",teacherRoutes);
app.use("/",async(req,res)=>{
    const notice = await Notice.find({
        for: {
        $in: [/student/]
        }
    }).sort({ createdAt: -1});
    res.render("index.ejs",{notice});
});

module.exports = app;