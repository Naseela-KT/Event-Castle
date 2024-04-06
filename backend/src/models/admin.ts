import {Document,Schema,model} from "mongoose";


export interface AdminDocument extends Document{
    email:string;
    password:string;
    createdAt:Date;
    isAdmin:boolean;
    wallet:number;
}

const adminSchema=new Schema<AdminDocument>({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    wallet:{
        type:Number,
        default:0
    }
})

export default model<AdminDocument>('Admin',adminSchema)

