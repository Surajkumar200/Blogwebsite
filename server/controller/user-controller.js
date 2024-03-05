import User from "../models/user.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Token from "../models/token.js";

dotenv.config();

export const signupUser = async (request,response) => {
   try {
        // const solt = await bcrypt.genSalt();
        const hashedPassword = await bcryptjs.hash(request.body.password,10);
       
  
      const user = { username: request.body.username, name: request.body.name, password: hashedPassword }
    
      const newUser = new User(user);
      await newUser.save();
  
      return response.status(200).json({ msg : 'signup successfull'})
   } catch (error) {
      return response.status(500).json({ msg:'error while signup the user'})
   }
    
  }


  export const loginUser = async( request,response) => {
 let user = await User.findOne({username:request.body.username} );
 if(!user){
   return response.status(400).json({ msg : 'Username does not match'});
 }
  try {
   let match = await bcryptjs.compare(request.body.password,user.password);
   if(match) {
      const accessToken = jwt.sign(user.toJSON(),process.env.ACCESS_SECRET_KEY,{expiresIn:'15m'});
      const refreshToken = jwt.sign(user.toJSON(),process.env.REFRESH_SECRET_KEY);
      
   const newToken = new Token({ Token : refreshToken});
   await newToken.save();

   return response.status(200).json({accessToken:accessToken, refreshToken:refreshToken,name : user.name, username: user.username });

   }else{
      response.status(400).json({ msg : 'Password does not match'});
   }
  } catch (error) {
   return response.status(500).json({ msg : 'Error while login in user'});
  }

  }