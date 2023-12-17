const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const auth = (req, res, next) => {
  try {
    let token = req.cookies.access_token;
    if (token) {
      let user = jwt.verify(token, SECRET_KEY);
      req.email = user.email;
      req.role = user.role;
      req.userId = user._id;
      next();
    } else {
      res.status(401).redirect("/");
    }
  } catch (error) {
    console.log("Error in auth", error.message);
    res.status(401).json({ message: "Unauthorized User" }).redirect("/");
  }
};

module.exports = auth;