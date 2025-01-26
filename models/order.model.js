import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'user',required:true},
    items:[
        {
            id:{type:mongoose.Types.ObjectId,ref:'menu',required:true},
            quantity:{type:Number,required:true}
        }
    ],
    totalAmount:{type:Number,required:true},
    status:{type:String,enum:["Pending",'Completed'],default:'Pending'}
},{timestamps:true})

const Order = mongoose.model('order',orderSchema)

export default Order