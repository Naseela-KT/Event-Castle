import { Request, Response } from "express";
import { CustomError } from "../error/customError";
import LiveService from "../services/liveService";

class LiveController{
  async getLive(req: Request, res: Response): Promise<void> {
    try {
      const data = await LiveService.getAllLive();
      res.status(200).json({ live: data });
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
      }
    }
  }

  async addLive(req: Request, res: Response): Promise<void> {
    try {
      const { url } = req.body;
      const data = await LiveService.addNewLive(url);
      res.status(200).json({ live: data });
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
      }
    }
  }
  async changeLiveStatus(req: Request, res: Response): Promise<void> {
    try {
      const { url } = req.body;
      const data = await LiveService.changeStatus(url);
      res.status(200).json({ live: data });
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
      }
    }
  }
};


export default new LiveController()