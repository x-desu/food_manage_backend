import mongoose from "mongoose";
import Menu from "../models/menu.model.js";

const connectDb = async() => {
    try {
       await mongoose.connect(process.env.MONGO_URI)
       console.log('MongoDb is connected')
     
    } catch (error) {
        console.log(error )
    }
}

export default connectDb