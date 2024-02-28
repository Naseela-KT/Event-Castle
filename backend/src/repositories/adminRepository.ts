import Admin , { AdminDocument } from "../models/admin";


export const findAdminByEmail = async (email: string): Promise<AdminDocument | null> => {
  try {
    return await Admin.findOne({ email });
  } catch (error) {
    throw error;
  }
};