const express=require('express');
const Property=require('../models/Property');

const router=express.Router();

//get all the listing
router.get('/',async(req,res)=>{
    const properties=await Property.find().populate('host', 'name email');
    res.json(properties);
});

//get listing by id
router.get('/:id',async(req,res)=>{
    const property=await Property.findById(req.params.id).populate('host','name email');
    if(!property){
        return res.status(404).json({mesg:'Property not found'});
    }
       res.json(property);
})

//post create property (host only)
router.post('/',async(req,res)=>{
    const {title,description,price,location,image,host}=req.body;
        const property=new Property({
            title,
            description,
            price,
            Location,
            images,
            host
        });
        await property.save();
        res.status(201).json(property);
   
})

// put update property
router.put('/:id',async(req,res)=>{
  const property=await Property.findByIdAndUpdate(req.params.id, req.body, {new:true});
  if(!property){
    return res.status(404).json({msg:'Property not found'});
  }res.json(property)
})

//delate property
router.delete(':/id',async(req,res)=>{
    const property=await Property.findByIdAndDelete(req.params.id);
    if(!property){
        return res.status(404).json({msg:'Property not found'});
    }
})

module.exports=router;