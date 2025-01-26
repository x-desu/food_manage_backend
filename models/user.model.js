import mongoose,{Schema} from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    image:{type:String,default:""},
    role:{type:String,enum:["admin","user"],default:"user"}
},{timestamps:true})

userSchema.pre('save',async function(next){
    try {
        if(this.isModified)   {
            this.password = await bcrypt.hash(this.password,10)
        } 
        next()
    } catch (error) {
        next(error)
    }
})

const User = await mongoose.model("user",userSchema)

export default User