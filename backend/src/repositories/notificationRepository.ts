import Notification, { NotificationDocument } from "../models/notificationModel";
import { BaseRepository } from "./baseRepository";


class NotificationRepository extends BaseRepository<NotificationDocument>{
  constructor(){
    super(Notification)
  }
}

export default new NotificationRepository()



