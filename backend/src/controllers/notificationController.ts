import { Request, Response } from "express";
import NotificationService from "../services/notificationService";


class NotificationController {
  async getUserNotifications(req: Request, res: Response){
    try {
      const userId:string=req.query.userId as string
      const data=await NotificationService.getNotificationForUser(userId)
      res.status(201).json({notification:data})
    } catch (error) {
      console.log(error)
    }
  }

  async getVendorNotifications(req: Request, res: Response){
    try {
      const vendorId:string=req.query.vendorId as string
      const data=await NotificationService.getNotificationForVendor(vendorId)
      res.status(201).json({notification:data})
    } catch (error) {
      console.log(error)
    }
  }

  async getAdminNotifications(req: Request, res: Response){
    try {
      const adminId:string=req.query.adminId as string
      const data=await NotificationService.getNotificationForAdmin(adminId)
      res.status(201).json({notification:data})
    } catch (error) {
      console.log(error)
    }
  }

  async toggleRead(req: Request, res: Response){
    try {
      const id:string=req.body.id as string
      const recipient:string=req.body.recipient as string;
      const data=await NotificationService.changeReadStatus(id,recipient)
      res.status(201).json({notification:data})
    } catch (error) {
      console.log(error)
    }
  }

};

export default new NotificationController()


