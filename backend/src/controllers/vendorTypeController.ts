import { Request , Response } from "express";
import { addType } from "../services/vendorTypeService";


export const VendorTypeController = {

    async addVendorType(req: Request, res: Response): Promise<void> {
        try {
          const {type , status } = req.body;
          console.log(req.body)
          const vendor = await addType(type,status);
          res.status(201).json(vendor);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Server Error' });
        }
      },

}