<<<<<<< Updated upstream
=======

import { CustomError } from "../error/customError";
>>>>>>> Stashed changes
import { createVendorType, deleteVendorById, findVerndorTypeByName ,findVerndorTypes, getVendorById, updateById} from "../repositories/vendorTypeRepository";


export const addType = async (type: string, status: string)=> {
  try {
    const existingType = await findVerndorTypeByName(type);
    if (existingType) {
      throw new Error("Type already exist!");
    }
    
    const new_type=await createVendorType({type,status:status==="Active"})

    return {  message: "New Type added..." ,new_type};
  } catch (error) {
    throw error;
  }
};

export const getTypes = async ()=> {
  try {
    const availableTypes=await findVerndorTypes()
    return availableTypes;
  } catch (error) {
    throw error;
  }
};


export const deleteType=async(vendorTypeId:string)=>{
  try {
    return await deleteVendorById(vendorTypeId)
    
  } catch (error) {
    throw error;
  }
}


export const getSingleType=async(vendorTypeId:string)=>{
  try {
    return await getVendorById(vendorTypeId)
    
  } catch (error) {
    throw error;
  }
}


export const updateVendorType=async(vendorTypeId: string, type: string, status: string): Promise<any> =>{
  try {
      const updatedType = await updateById(vendorTypeId, { type, status:status==="Active"?true:false });
      return updatedType;
  } catch (error) {
      throw new Error('Failed to update vendor type.');
  }
}






