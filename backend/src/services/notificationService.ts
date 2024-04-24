
import NotificationRepository from "../repositories/notificationRepository";


class NotificationService{
  async getNotificationForUser(userId:string){
    try {
      const data = await NotificationRepository.findByCondition({recipient:userId});
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getNotificationForVendor(vendorId:string){
    try {
      const data = await NotificationRepository.findByCondition({recipient:vendorId});
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getNotificationForAdmin(adminId:string){
    try {
      const data = await NotificationRepository.findByCondition({recipient:adminId});
      return data;
    } catch (error) {
      throw error;
    }
  }

  async changeReadStatus(id:string,recipient:string){
    try {
      const notificationItem = await NotificationRepository.getById(id); 
      if (!notificationItem) {
        throw new Error('Notification not found');
    }
    notificationItem.read = !notificationItem.read;
    await notificationItem.save();
      
      return await NotificationRepository.findByCondition({recipient:recipient});
    } catch (error) {
      throw error;
    }
  };
  
}


export default new NotificationService()








