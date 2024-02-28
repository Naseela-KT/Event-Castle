import mongoose, { Schema, Document } from 'mongoose';


export interface User {
    email : string;
    password : string;
    name : string;
    phone : number;
    isActive:boolean;
}

export interface UserDocument extends User, Document {}

const UserSchema: Schema = new Schema({
    email :{type:String , required:true, unique:true},
    password:{type:String, required:true} , 
    name :{type:String , required:true} ,
    phone :{type:Number , required:true , unique:true},
    isActive :{type:Boolean , required:true}

});

export default mongoose.model<UserDocument>('User', UserSchema);