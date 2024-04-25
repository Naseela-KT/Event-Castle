import {Document,Schema,model} from "mongoose";


export interface PostDocument extends Document{
    imageUrl: string;
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
    vendor_id:{
        type:Schema.Types.ObjectId,
        ref: 'Vendor',
        required:true
    },
    image:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String
    }
},{timestamps:true})

export default model<PostDocument>('Post',postSchema)

