import mongoose, { Schema, Document } from 'mongoose';


export interface User {
    email : string;
    password : string;
    name : string;
    phone : number;
    isActive:boolean;
    image:string;
    imageUrl:string
}

export interface UserDocument extends User, Document {}

const UserSchema: Schema = new Schema({
    email :{type:String , required:true, unique:true},
    password:{type:String, required:true} , 
    name :{type:String , required:true} ,
    phone :{type:Number },
    isActive :{type:Boolean , required:true},
    image:{type:String},
    imageUrl:{type:String}
});

export default mongoose.model<UserDocument>('User', UserSchema);