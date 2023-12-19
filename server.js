const app = require('./app');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: `./config.env`});

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
// console.log(MONGO_URI);
async function connectDB(){
    try{
        await mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB");
    }catch(err){
        console.error("Mongo connection error",err);
    }
}


// const addAdmin = async () => {
//     try {
//         const User = require('./models/user.model');
//         const bcrypt = require('bcryptjs');
//         const salt = bcrypt.genSaltSync(10);
//         const hash = bcrypt.hashSync(process.env.ADMIN_PASSWORD, salt);
//         const admin = new User({
//             name: 'Admin',
//             email: process.env.ADMIN_EMAIL,
//             password: hash,
//             role: 'admin'
//         });
        
//         await admin.save();
//         console.log('Admin added:', admin);
//     } catch (error) {
//         console.error('Error adding admin:', error.message);
//     }
// };



connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch((err)=>{
    console.error("Error connecting to MongoDB",err);
});
