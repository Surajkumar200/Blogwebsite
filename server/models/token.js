import mongoose from "mongoose";

const tokenSchema = mongoose.Schema({
    token:{
        type:String,
        require:true
    }
})

const token = mongoose.model('token', tokenSchema);

export default token ;