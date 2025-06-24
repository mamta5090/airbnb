const express=require('express')
const Booking=require('../models/Booking')

const router=express.Router();

router.post('/',async()=>{
    const {user,property,startDate,endDate,totalPrice}=req.body;
    const booking=new Booking({user,property,startDate,endDate,totalPrice});
    await booking.save();
    res.status(201).json(booking);
});

//get all booking
router.get('/user/:userId',async(req,res)=>{
    const bookings=await Booking.find({user:req.params.userId}).populate('property');
    res.json(bookings);
});
module.exports=router