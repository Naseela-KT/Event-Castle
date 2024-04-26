
import mongoose from "mongoose";
import NotificationRepository from "../repositories/notificationRepository";


class NotificationService{
  async getNotifications(recipient:string){
    try {
      const data = await NotificationRepository.findAllNotifications(recipient)
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getUnreadNotifications(recipient:string){
    try {
      const data = await NotificationRepository.findUnreadNotifications(recipient)
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
  }

  async delete(_id:string){
    try {
      const notificationItem = await NotificationRepository.getById(_id); 
      if (!notificationItem) {
        throw new Error('Notification not found');
    }
 
      return await NotificationRepository.delete(_id)
    } catch (error) {
      throw error;
    }
  }
  
}


export default new NotificationService()








