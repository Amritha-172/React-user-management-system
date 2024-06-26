import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const verifyToken = async (req, res, next) => {
  const token = req.header("Authorization");
  const userId=req.header("User-Id");
  
   const user=await User.findOne({_id:userId})
   console.log(user);
   if(!user){
    localStorage.removeItem("token")
    }
  if (!token) {
    return res.status(401).json("You need to login");
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(401).json("Token is invalid");
    req.user = user;
    next();
  });
};
