const mongoose=require('mongoose');

const bookingSchema=new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    property:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property',
        required: true
    },
    startDate:{
        type: Date,
        required: true
    },
    totalPrice:{
        type: Number,
        required: true
    },
})
exports=mongoose.model('Booking',bookingSchema);