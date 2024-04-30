import { CustomError } from "../error/customError";
import Notification, {
  NotificationDocument,
} from "../models/notificationModel";
import { BaseRepository } from "./baseRepository";

class NotificationRepository extends BaseRepository<NotificationDocument> {
  constructor() {
    super(Notification);
  }

  async findAllNotifications(recipient: string) {
    return await Notification.find({ recipient: recipient }).sort({
      createdAt: -1,
    });
  }

  async findUnreadNotifications(recipient: string) {
    return await Notification.find({ recipient: recipient }, { read: false });
  }
}

export default new NotificationRepository();
