import {Document,Schema,model} from "mongoose";


export interface LiveDocument extends Document{
    url:string;
    finished:boolean
}

const liveSchema=new Schema<LiveDocument>({
    url:{
        type:String,
        required:true
    },
    finished:{
        type:Boolean,
        default:false
    }
},{timestamps:true})


export default model<LiveDocument>('Live',liveSchema)

