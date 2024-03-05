import mongoose from "mongoose";

 const Connection = async(username,password) => {
    const URL = `mongodb+srv://${username}:${password}@suraj-mern-project.vlfl5nl.mongodb.net/`;
    try{
         await mongoose.connect(URL);
         console.log('Database connected sussesfully');
    }catch(error){
          console.log('error while connecting with the database',error)
    }
}
 export default Connection;

