import {Document,Schema,model} from "mongoose";


export interface paymentDocument extends Document{
    amount:number;
    vendorId:Schema.Types.ObjectId;
    userId:Schema.Types.ObjectId;
    bookingId:Schema.Types.ObjectId;
    createdAt:Date;
}

const paymentSchema=new Schema<paymentDocument>({
    vendorId:{
        type:Schema.Types.ObjectId,
        ref: 'Vendor',
        required:true
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    bookingId:{
        type:Schema.Types.ObjectId,
        ref: 'Booking',
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    amount:{
        type:Number,
        default:0
    }
})

export default model<paymentDocument>('Payment',paymentSchema)

