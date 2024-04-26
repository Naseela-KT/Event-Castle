import Notification, { NotificationDocument } from "../models/notificationModel";
import { BaseRepository } from "./baseRepository";


class NotificationRepository extends BaseRepository<NotificationDocument>{
  constructor(){
    super(Notification)
  }

  async findAllNotifications(recipient:string){
    try {
      return await Notification.find({recipient:recipient}).sort({createdAt:-1})
    } catch (error) {
      
    }
  }

  async findUnreadNotifications(recipient:string){
    try {
      return await Notification.find({recipient:recipient},{read:false})
    } catch (error) {
      
    }
  }
}

export default new NotificationRepository()



