import {Document,Schema,model} from "mongoose";


export interface PostDocument extends Document{
    caption:string;
    image:string;
    createdAt:Date;
    vendor_id:Schema.Types.ObjectId;
}

const postSchema=new Schema<PostDocument>({
    caption:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    vendor_id:{
        type:Boolean,
        required:true
    },
    image:{
        type:String,
        required:true
    }
})

export default model<PostDocument>('Post',postSchema)

