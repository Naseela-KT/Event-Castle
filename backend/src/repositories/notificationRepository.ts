import Admin , { AdminDocument } from "../models/admin";
import notification from "../models/notification";


export const findNotificationsByUserId = async (userId: string)=> {
  try {
    return await notification.find({recipient:userId});
  } catch (error) {
    throw error;
  }
};




export const findNotificationsByVendorId = async (vendorId: string)=> {
    try {
      return await notification.find({recipient:vendorId});
    } catch (error) {
      throw error;
    }
  };

export const findNotificationsByAdminId=async (adminId: string)=> {
  try {
    return await notification.find({recipient:adminId});
  } catch (error) {
    throw error;
  }
};

export const changeStatusById=async(id: string,recipient:string)=>{
    try {
        const notificationItem = await notification.findById(id); 
        if (!notificationItem) {
            throw new Error('Notification not found');
        }
        notificationItem.read = !notificationItem.read;

        await notificationItem.save();

        return await findNotificationsByVendorId(recipient)
        
      } catch (error) {
        throw error;
      }
}

