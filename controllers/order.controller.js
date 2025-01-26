import mongoose from "mongoose"
import Order from "../models/order.model.js"

export const orderCheckout = async(req,res) => {

    const {items,totalAmount} = req.body
    const userId = req.auth.id
    if(!items || !totalAmount){
        return res.status(400).json({error:"order not received"})
    }
    try {
        const order = new Order({
            userId,
            items,
            totalAmount
        })
       const newOrder =  await order.save()
       
        res.status(201).json({message:'ordered successfully!'})
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

export const getAllOrders = async (req, res) => {
    const role = req.auth.role
    const {sort} = req.query
    
    let sortQuery = {}
        
    switch (sort) {
        case 'price_asc':
            sortQuery = { totalAmount: 1 }; 
            break;
        case 'pend':
            sortQuery = { status: -1 }; 
            break;
        case 'comp':
            sortQuery = { status: 1 }; 
            break;
        case 'price_desc':
            sortQuery = { totalAmount: -1 }; 
            break;
        case 'date_asc':
            sortQuery = { createdAt: 1 }; 
            break;
        case 'date_desc':
            sortQuery = { createdAt: -1 }; 
            break;
        default:
            sortQuery = { createdAt: -1 }; 
    }

    if(role!=='admin'){
        return res.status(401).json({error:'Unauthorized'})
    }

    try {
        const orders = await Order.find()
        .populate('userId','name email image')
        .sort(sortQuery)
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: error.message });
    }

}

export const updateOrderStatus = async (req,res) => {
    const role = req.auth.role
    const {id} = req.params
    const {status} = req.body
    if(role!=='admin'){
        return res.status(401).json({error:'Unauthorized'})
    }
    
    try {
        const orders = await Order.findByIdAndUpdate(
            id,
            {status},
            {new:true}
        )
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error updating orders:', error);
        res.status(500).json({ error: error.message });
    }
}

export const getOrder = async (req, res) => {
    const userId = req.auth.id; // Get userId from request
    const userObjectId =new mongoose.Types.ObjectId(userId);
    try {
        const orders = await Order.find({userId:userObjectId})
        .populate('userId','name email image')
        .populate('items.id','image name price')
        .sort({ createdAt: -1 } )

        // const orders = await Order.aggregate([
        //     {
        //         $match:{userId:userObjectId}
        //     },
        //     {
        //         $unwind:'$items'
        //     },
        //     { 
        //         $addFields: {
        //             "items.id": { $toObjectId: "$items.id" }  
        //         }
        //     },
        //     {
        //         $lookup:{
        //             from:'menu',
        //             localField:'items.id',
        //             foreignField:'_id',
        //             as:'itemDetails'
        //         }
        //     },
        //     // {
        //     //     $unwind:"$itemDetails"
        //     // },
        //     // {
        //     //     $addFields:{
        //     //         'items.name':'$itemDetails.name',
        //     //         'items.price':'$itemDetails.price',
        //     //         'items.image':'$itemDetails.image',
        //     //     }
        //     // },
        //     // {
        //     //     $group:{
        //     //         _id:'$_id',
        //     //         userId: { $first: "$userId" },
        //     //         totalAmount: { $first: "$totalAmount" },
        //     //         status: { $first: "$status" },
        //     //         createdAt: { $first: "$createdAt" },
        //     //         updatedAt: { $first: "$updatedAt" },
        //     //         items: { $push: "$items" },
        //     //     }
        //     // },
        //     {
        //         $sort: { createdAt: -1 }  
        //       }

        // ])

       
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: error.message });
    }
};