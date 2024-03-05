import { createVendorType, findVerndorTypeByName ,findVerndorTypes} from "../repositories/vendorTypeRepository";


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



