import mongoose, { Schema, Document } from 'mongoose';


export interface Review {
    _id: mongoose.Types.ObjectId;
    username: string;
    rating: number;
    content: string;
    date:Date;
    reply:Array<string>
}

interface Lock {
    date: string;
    isLocked: boolean;
}

export interface Vendor {
    email : string;
    password : string;
    name:string;
    city:string;
    about:string;
    phone:number;
    logo:string;
    coverpic:string;
    reviews:Array<Review>;
    isVerified:boolean;
    verificationRequest:boolean;
    totalBooking:number;
    vendor_type:Schema.Types.ObjectId;
    isActive:boolean;
    coverpicUrl:string;
    logoUrl:string;
    bookedDates:Array<string>;
    refreshToken:string;
    totalRating:number;
    locks: Lock[];
    
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
    reviews:{type:Array<Review>},
    isVerified:{type:Boolean},
    verificationRequest:{type:Boolean},
    totalBooking:{type:Number},
    vendor_type:{type:Schema.Types.ObjectId},
    isActive:{type:Boolean},
    coverpicUrl:{type:String},
    logoUrl:{type:String},
    bookedDates:{type:Array<String>},
    refreshToken:{type:String},
    totalRating:{type:Number},
    locks: [{
        date: {
          type: String,
          required: true
        },
        isLocked: {
          type: Boolean,
          default: false
        }
      }]

});

export default mongoose.model<VendorDocument>('Vendor', VendorSchema);