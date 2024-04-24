import { CustomError } from "../error/customError";
import VendorTypeRepository from "../repositories/vendorTypeRepository";

class VendorTypeService {
  async addType(type: string, status: string) {
    try {
      const existingType = await VendorTypeRepository.findByType(type);
      if (existingType) {
        throw new CustomError("Type already exist!", 401);
      }

      const new_type = await VendorTypeRepository.create({
        type,
        status: status === "Active",
      });
      return { message: "New Type added...", new_type };
    } catch (error) {
      throw error;
    }
  }

  async getTypes() {
    try {
      const availableTypes = await VendorTypeRepository.getAll();
      return availableTypes;
    } catch (error) {
      throw error;
    }
  }

  async deleteType(vendorTypeId: string) {
    try {
      return await VendorTypeRepository.delete(vendorTypeId);
    } catch (error) {
      throw error;
    }
  }

  async getSingleType(vendorTypeId: string) {
    try {
      return await VendorTypeRepository.findOne({ _id: vendorTypeId });
    } catch (error) {
      throw error;
    }
  }

  async updateVendorType(
    vendorTypeId: string,
    type: string,
    status: string
  ): Promise<any> {
    try {
      const updatedType = await VendorTypeRepository.update(vendorTypeId, {
        type,
        status: status === "Active" ? true : false,
      });
      return updatedType;
    } catch (error) {
      throw new Error("Failed to update vendor type.");
    }
  }
}

export default new VendorTypeService();


