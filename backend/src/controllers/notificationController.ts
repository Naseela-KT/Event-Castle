import { Request, Response } from "express";
import NotificationService from "../services/notificationService";
import { handleError } from "../utils/handleError";


class NotificationController {
  async getAllNotifications(req: Request, res: Response){
    try {
      const recipient:string=req.query.recipient as string
      const data=await NotificationService.getNotifications(recipient)
      res.status(201).json({notification:data})
    } catch (error) {
      handleError(res, error, "getAllNotifications");
    }
  }




  async getAdminNotifications(req: Request, res: Response){
    try {
      const adminId:string=req.query.adminId as string
      const data=await NotificationService.getNotificationForAdmin(adminId)
      res.status(201).json({notification:data})
    } catch (error) {
      handleError(res, error, "getAdminNotifications");
    }
  }

  async toggleRead(req: Request, res: Response){
    try {
      const id:string=req.body.id as string
      const recipient:string=req.body.recipient as string;
      const data=await NotificationService.changeReadStatus(id,recipient)
      res.status(201).json({notification:data})
    } catch (error) {
      handleError(res, error, "toggleRead");
    }
  }

  async deleteNotification(req: Request, res: Response){
    try {
      console.log(req.query)
      const {id:_id, recipient } = req.query as { id: string; recipient: string };
       
      const deleteData=await NotificationService.delete(_id)
      const data=await NotificationService.getNotifications(recipient)
      res.status(201).json({notification:data})
    } catch (error) {
      handleError(res, error, "deleteNotification");
    }
  }

  async getCount(req: Request, res: Response){
    try {
      const {recipient } = req.query as { recipient: string };
      const data=await NotificationService.getUnreadNotifications(recipient)
      res.status(201).json({count:data?.length})
    } catch (error) {
      handleError(res, error, "getCount");
    }
  }


};

export default new NotificationController()


