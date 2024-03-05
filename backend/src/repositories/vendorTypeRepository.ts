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


