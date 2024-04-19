
import { changeStatusById, findNotificationsByUserId, findNotificationsByVendorId } from "../repositories/notificationRepository";



export const getNotificationForUser = async (userId:string) => {
  try {
    const data = await findNotificationsByUserId(userId);
    return data;
  } catch (error) {
    throw error;
  }
};



export const getNotificationForVendor = async (vendorId:string) => {
    try {
      const data = await findNotificationsByVendorId(vendorId);
      return data;
    } catch (error) {
      throw error;
    }
  };

export const changeReadStatus = async (id:string,recipient:string) => {
    try {
      const data = await changeStatusById(id,recipient);
      return data;
    } catch (error) {
      throw error;
    }
  };