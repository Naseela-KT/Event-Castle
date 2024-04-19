import { Request, Response } from "express";
import { CustomError } from "../error/customError";
import { addNewLive, changeStatus, getAllLive } from "../services/liveService";

export const LiveController = {
  async getLive(req: Request, res: Response): Promise<void> {
    try {
      const data = await getAllLive();
      res.status(200).json({ live: data });
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
      }
    }
  },

  async addLive(req: Request, res: Response): Promise<void> {
    try {
      const { url } = req.body;
      const data = await addNewLive(url);
      res.status(200).json({ live: data });
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
      }
    }
  },
  async changeLiveStatus(req: Request, res: Response): Promise<void> {
    try {
      const { url } = req.body;
      console.log(url)
      const data = await changeStatus(url);
      res.status(200).json({ live: data });
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
      }
    }
  },
};
