import { Request , Response } from "express";
import vendorTypeService from "../services/vendorTypeService";
import { CustomError } from "../error/customError";


class VendorTypeController{

    async addVendorType(req: Request, res: Response): Promise<void> {
        try {
          const {type , status } = req.body;
          console.log(req.body)
          const vendor = await vendorTypeService.addType(type,status);
          res.status(201).json(vendor);
        } catch (error) {
          if (error instanceof CustomError) {
            res.status(error.statusCode).json({ message: error.message });
          } else {
            console.error(error);
            res.status(500).json({ message: "Server Error" });
          }}
      }

      async getVendorTypes(req:Request,res:Response):Promise<void>{
        try{
          const vendorTypes=await vendorTypeService.getTypes();
          res.status(200).json(vendorTypes)
        }catch(error){
          console.error(error);
          res.status(500).json({ message: 'Server Error' });
        }
      }

      async deleteVendorType(req: Request, res: Response): Promise<void> {
        try {
          const vendorTypeId: string | undefined = req.query?.id as string | undefined;
          
          if (!vendorTypeId) {
            res.status(400).json({ message: 'Vendor Type ID is missing or invalid.' });
            return;
          }
      
          const result = await vendorTypeService.deleteType(vendorTypeId);
          res.status(200).json({ message: 'Vendor deleted successfully' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Server Error' });
        }
      }


      async LoadSingleType(req: Request, res: Response): Promise<void> {
        try {
          const vendorTypeId: string | undefined = req.query?.id as string | undefined;
          
          if (!vendorTypeId) {
            res.status(400).json({ message: 'Vendor Type ID is missing or invalid.' });
            return;
          }
      
          const result = await vendorTypeService.getSingleType(vendorTypeId);
          res.status(200).json(result);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Server Error' });
        }
      }

      async updateType(req: Request, res: Response): Promise<void> {
        try {
            const vendorTypeId: string | undefined = req.query?.id as string | undefined;
            
            if (!vendorTypeId) {
                res.status(400).json({ message: 'Vendor Type ID is missing or invalid.' });
                return;
            }
            const { type, status } = req.body;
    
            const result = await vendorTypeService.updateVendorType(vendorTypeId, type, status);
            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
        }
    }
}

export default new VendorTypeController()



