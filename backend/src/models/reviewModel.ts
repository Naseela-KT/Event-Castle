import mongoose, {Document,Schema,model} from "mongoose";


export interface ReviewDocument extends Document{
    _id: mongoose.Types.ObjectId;
    userId:mongoose.Types.ObjectId;
    vendorId:mongoose.Types.ObjectId;
    rating: number;
    content: string;
    date:Date;
    reply:Array<string>
}

const reviewSchema=new Schema<ReviewDocument>({ 
    userId:{
        type:Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    vendorId:{
        type:Schema.Types.ObjectId,
        ref: 'Vendor',
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    reply:[{
        type:String
    }]
},{timestamps:true})

export default model<ReviewDocument>('Review',reviewSchema)

