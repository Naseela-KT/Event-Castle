import Admin , { AdminDocument } from "../models/adminModel";


export const findAdminByEmail = async (email: string): Promise<AdminDocument | null> => {
  try {
    return await Admin.findOne({ email });
  } catch (error) {
    throw error;
  }
};

export const findAdminById= async (adminId: string): Promise<AdminDocument | null> => {
  try {
    const result=await Admin.findOne({ _id:adminId });
    return result;
  } catch (error) {
    throw error;
  }
};

