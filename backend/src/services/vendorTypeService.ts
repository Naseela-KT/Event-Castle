import { CustomError } from "../error/customError";
import VendorTypeRepository from "../repositories/vendorTypeRepository";

class VendorTypeService {
  async addType(type: string, status: string, image:string, imageUrl:string) {
    try {
      const existingType = await VendorTypeRepository.findByType(type);
      if (existingType) {
        throw new CustomError("Type already exist!", 401);
      }

      const new_type = await VendorTypeRepository.create({
        type,
        status: status === "Active",
        image,
        imageUrl
      });
      return { message: "New Type added...", new_type };
    } catch (error) {
      console.error("Error in addType:", error)
      throw new CustomError("Failed to add new vendor type.", 500);
    }
  }

  async getTypes() {
    try {
      const availableTypes = await VendorTypeRepository.getAll();
      return availableTypes;
    } catch (error) {
      console.error("Error in getTypes:", error)
      throw new CustomError("Failed to retrieve vendor types.", 500);
    }
  }

  async deleteType(vendorTypeId: string) {
    try {
      return await VendorTypeRepository.delete(vendorTypeId);
    } catch (error) {
      console.error("Error in deleteType:", error)
      throw new CustomError("Failed to delete vendor type.", 500);
    }
  }

  async getSingleType(vendorTypeId: string) {
    try {
      const vendorType= await VendorTypeRepository.findOne({ _id: vendorTypeId });
      if (!vendorType) {
        throw new CustomError("Vendor type not found.", 404)
      }
      return vendorType;
    } catch (error) {
      console.error("Error in getSingleType:", error)
      throw new CustomError("Failed to retrieve vendor type.", 500); 
    }
  }

  async updateVendorType(
    vendorTypeId: string,
    type: string,
    status: string,
    image:string,
    imageUrl:string
  ): Promise<any> {
    try {
      const updatedType = await VendorTypeRepository.update(vendorTypeId, {
        type,
        status: status === "Active" ? true : false,
        image,
        imageUrl
      });
      return updatedType;
    } catch (error) {
      console.error("Error in updateVendorType:", error)
      throw new CustomError("Failed to update vendor type.", 500); 
    }
  }
}

export default new VendorTypeService();


