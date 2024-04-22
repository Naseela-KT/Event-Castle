import { ObjectId } from "mongoose";
import VendorType , {VendorTypeDocument} from "../models/vendorTypeModel";

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
  };


  export const getVendorById=async(vendorTypeId:string):Promise<VendorTypeDocument | null>=>{
    try {
      return await VendorType.findOne({_id:vendorTypeId});
      
    } catch (error) {
      throw error;
    }
  };


  export const updateById=async(vendorTypeId: string, update: Partial<VendorTypeDocument>): Promise<any>=> {
        try {
            const updatedType = await VendorType.findByIdAndUpdate(vendorTypeId, update, { new: true });
            return updatedType;
        } catch (error) {
            throw new Error('Failed to update vendor type in the database.');
        }
    }

