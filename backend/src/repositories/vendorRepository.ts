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

export const findAllVendors = async (): Promise<VendorDocument[] | null> => {
  try {
    return await Vendor.find({});
  } catch (error) {
    throw error;
  }
};

export const UpdateVendorPassword = async(password:string , mail:string) =>{
  try {
    const result = await Vendor.updateOne({ email: mail }, { password: password });
    if (result.modifiedCount === 1) {
      return { success: true, message: "Vendor Password updated successfully." };
    } else {
      return { success: false, message: "Vendor not found or password not updated." };
    }
  } catch (error) {
    throw error;
  }
}


export const findVendorById = async (
  vendorId: string
): Promise<VendorDocument | null> => {
  try {
    return await Vendor.findById( vendorId );
  } catch (error) {
    throw error;
  }
};

export const UpdatePassword = async(password:string , mail:string) =>{
  try {
    const result = await Vendor.updateOne({ email: mail }, { password: password });
    if (result.modifiedCount === 1) {
      return { success: true, message: "Password updated successfully." };
    } else {
      return { success: false, message: "User not found or password not updated." };
    }
  } catch (error) {
    throw error;
  }
}

export const AddVendorReview = async(content: string, rating: number, userId: string, vendorId: string)=>{
  try {
     const vendorData = await Vendor.findById(vendorId);
       if (!vendorData) {
         throw new Error('Vendor not found');
       }
 
     vendorData.reviews.push({content,rating,userId});
 
     await vendorData.save();
     return true;
  } catch (error) {
    throw error;
  }
 }

