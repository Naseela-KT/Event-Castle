import {Document,Schema,model} from "mongoose";


export interface PaymentDocument extends Document{
    amount:number;
    vendorId:Schema.Types.ObjectId;
    userId:Schema.Types.ObjectId;
    bookingId:Schema.Types.ObjectId;
    createdAt:Date;
}

const paymentSchema=new Schema<PaymentDocument>({
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
    amount:{
        type:Number,
        default:0
    }
},{timestamps:true})

export default model<PaymentDocument>('Payment',paymentSchema)

