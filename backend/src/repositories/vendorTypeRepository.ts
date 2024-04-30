
import VendorType, { VendorTypeDocument } from "../models/vendorTypeModel";
import { BaseRepository } from "./baseRepository";

class VendorTypeRepository extends BaseRepository<VendorTypeDocument> {
  constructor() {
    super(VendorType);
  }

  async findByType(type:string){
      return await VendorType.findOne({type:type})
    
  }
}

export default new VendorTypeRepository();
