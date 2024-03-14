import { ObjectId } from "mongoose";
import VendorType , {VendorTypeDocument} from "../models/vendorType";

export const createVendorType = async (vendorData : Partial<VendorTypeDocument>): Promise<VendorTypeDocument> => {
    try {
      return await VendorType.create(vendorData);
    } catch (error) {
      throw error;
    }
  };


  export const findVerndorTypeByName = async (type: string): Promise<VendorTypeDocument | null> => {
    try {
      return await VendorType.findOne({ type });
    } catch (error) {
      throw error;
    }
  };


  export const findVerndorTypes = async (): Promise<VendorTypeDocument[] | null> => {
    try {
      return await VendorType.find();
    } catch (error) {
      throw error;
    }
  };

  export const findVerndorIdByType = async (type:string): Promise<VendorTypeDocument | null> => {
    try {
      const data=await VendorType.findOne({type:type});
      return data;
    } catch (error) {
      throw error;
    }
  };


  export const deleteVendorById=async(vendorTypeId:string):Promise<VendorTypeDocument | null>=>{
    try {
      return await VendorType.findByIdAndDelete(vendorTypeId);
      
    } catch (error) {
      throw error;
    }
  }


