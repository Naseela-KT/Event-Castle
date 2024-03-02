import Vendor , {VendorDocument} from "../models/vendor";

export const createVendor = async (vendorData : Partial<VendorDocument>): Promise<VendorDocument> => {
    try {
      return await Vendor.create(vendorData);
    } catch (error) {
      throw error;
    }
  };


export const findvendorByEmail = async (email: string): Promise<VendorDocument | null> => {
    try {
      return await Vendor.findOne({ email });
    } catch (error) {
      throw error;
    }
};