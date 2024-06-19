import mongoose, { Schema, Document } from 'mongoose';


export interface VendorType {
    type:string;
    status:boolean;
    image:string;
    imageUrl:string;
}

export interface VendorTypeDocument extends VendorType, Document {}

const VendorTypeSchema: Schema = new Schema({
    type :{type:String , required:true} ,
    status :{type:Boolean , required:true,default:true},
    image:{type:String,required:true,default:""},
    imageUrl:{type:String,default:""},
    isEditing:{type:Boolean,default:false}
},{timestamps:true});

export default mongoose.model<VendorTypeDocument>('vendortype', VendorTypeSchema);