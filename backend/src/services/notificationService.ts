
import NotificationRepository from "../repositories/notificationRepository";
import { CustomError } from "../error/customError";

class NotificationService {
  async getNotifications(recipient: string,page: number, pageSize: number) {
    try {
      return await NotificationRepository.findAllNotifications(recipient, page, pageSize);
     
    } catch (error) {
      console.error("Error in getNotifications:", error);
      throw new CustomError("Failed to fetch notifications.", 500);
    }
  }

  async getUnreadNotifications(recipient: string) {
    try {
      const data = await NotificationRepository.findUnreadNotifications(
        recipient
      );
      return data;
    } catch (error) {
      console.error("Error in getUnreadNotifications:", error);
      throw new CustomError("Failed to fetch unread notifications.", 500);
    }
  }

  async getNotificationForAdmin(adminId: string) {
    try {
      const data = await NotificationRepository.findByCondition({
        recipient: adminId,
      });
      return data;
    } catch (error) {
      console.error("Error in getNotificationForAdmin:", error);
      throw new CustomError("Failed to fetch notifications for admin.", 500);
    }
  }

  async changeReadStatus(id: string, recipient: string) {
    try {
      const notificationItem = await NotificationRepository.getById(id);
      if (!notificationItem) {
        throw new CustomError("Notification not found.", 404);
      }
      notificationItem.read = !notificationItem.read;
      await notificationItem.save();

      return await NotificationRepository.findByCondition({
        recipient: recipient,
      });
    } catch (error) {
      console.error("Error in changeReadStatus:", error);
      throw new CustomError("Failed to change read status.", 500);
    }
  }

  async delete(_id: string) {
    try {
      const notificationItem = await NotificationRepository.getById(_id);
      if (!notificationItem) {
        throw new CustomError("Notification not found.", 404);
      }

      return await NotificationRepository.delete(_id);
    } catch (error) {
      console.error("Error in deleteNotification:", error);
      throw new CustomError("Failed to delete notification.", 500);
    }
  }
}

export default new NotificationService();
