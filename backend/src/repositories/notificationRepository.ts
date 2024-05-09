import { CustomError } from "../error/customError";
import Notification, {
  NotificationDocument,
} from "../models/notificationModel";
import { BaseRepository } from "./baseRepository";

class NotificationRepository extends BaseRepository<NotificationDocument> {
  constructor() {
    super(Notification);
  }

  async findAllNotifications(recipient: string,page: number, pageSize: number) {
    const skip = (page - 1) * pageSize;
      const notifications = await Notification.find({ recipient: recipient }).sort({
        createdAt: -1})
        .skip(skip)
        .limit(pageSize)
        .exec();
        
      const count = await Notification.countDocuments({ recipient: recipient })
      return { notifications, count };
   
  }

  async findUnreadNotifications(recipient: string) {
    return await Notification.find({ recipient: recipient }, { read: false });
  }
}

export default new NotificationRepository();
