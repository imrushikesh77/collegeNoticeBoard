const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const adminRoutes = require("./routes/admin.routes.js");
const teacherRoutes = require("./routes/teacher.routes.js");
const Notice = require("./models/notice.model.js");

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.set('view engine', 'ejs') ;
app.use('/loginoptions',async(req,res)=>{
    res.render('loginoptions.ejs' );
});
app.use(express.static('./public'));



app.use("/admin",adminRoutes);
app.use("/teacher",teacherRoutes);
app.use("/",async(req,res)=>{
    const notice = await Notice.find({
        forRole: {
        $in: [/student/]
        }
    }).sort({ createdAt: -1});
    let count  = notice.length;
    res.render("index.ejs",{notice,count});
});

module.exports = app;