import {Document,Schema,model} from "mongoose";


export interface AdminDocument extends Document{
    email:string;
    password:string;
    createdAt:Date;
    isAdmin:boolean;
<<<<<<< Updated upstream
=======
    wallet:number;
    refreshToken:string;
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
    isAdmin:{
        type:Boolean,
        required:true
    }
})
=======
    wallet:{
        type:Number,
        default:0
    },
    refreshToken:{
        type:String
    },
},{timestamps:true})
>>>>>>> Stashed changes

export default model<AdminDocument>('Admin',adminSchema)

