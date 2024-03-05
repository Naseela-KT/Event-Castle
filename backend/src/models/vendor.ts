import mongoose, { Schema, Document } from 'mongoose';


export interface Vendor {
    email : string;
    password : string;
    name:string;
    city:string;
    about:string;
    phone:number;
    logo:string;
    coverpic:string;
    reviews:object;
    isVerified:boolean;
    verificationRequest:boolean;
    totalBooking:number;
    vendor_type:Schema.Types.ObjectId;
    isActive:boolean;
    
}

export interface VendorDocument extends Vendor, Document {}

const VendorSchema: Schema = new Schema({
    email :{type:String , required:true, unique:true},
    password:{type:String, required:true} , 
    name :{type:String , required:true} ,
    phone :{type:Number , required:true , unique:true},
    city:{type:String , required:true},
    about:{type:String},
    logo:{type:String},
    coverpic:{type:String},
    reviews:{type:Object},
    isVerified:{type:Boolean},
    verificationRequest:{type:Boolean},
    totalBooking:{type:Number},
    vendor_type:{type:Schema.Types.ObjectId},
    isActive:{type:Boolean}

});

export default mongoose.model<VendorDocument>('Vendor', VendorSchema);