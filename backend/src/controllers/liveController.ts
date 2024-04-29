import { Request, Response } from "express";
import LiveService from "../services/liveService";
import { handleError } from "../utils/handleError";

class LiveController{
  async getLive(req: Request, res: Response): Promise<void> {
    try {
      const data = await LiveService.getAllLive();
      res.status(200).json({ live: data });
    } catch (error) {
      handleError(res, error, "getLive"); 
    }
  }

  async addLive(req: Request, res: Response): Promise<void> {
    try {
      const { url } = req.body;
      const data = await LiveService.addNewLive(url);
      res.status(200).json({ live: data });
    } catch (error) {
      handleError(res, error, "addLive"); 
    }
  }
  async changeLiveStatus(req: Request, res: Response): Promise<void> {
    try {
      const { url } = req.body;
      const data = await LiveService.changeStatus(url);
      res.status(200).json({ live: data });
    } catch (error) {
      handleError(res, error, "changeLiveStatus"); 
    }
  }
};


export default new LiveController()