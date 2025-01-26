import mongoose,{Schema} from "mongoose";

const categories = ['Appetizers', 'Main Course', 'Desserts', 'Beverages','Snacks'];

const menuSchema = new Schema({
    name:{type:String,required:true,index:true},
    image:{type:String,required:true},
    price:{type:Number,required:true},
    stock:{type:Number,required:true,default:0},
    category:{type:String,enum:categories,required:true},
},{timestamps:true})

const Menu = mongoose.model("menu",menuSchema)

export default Menu;