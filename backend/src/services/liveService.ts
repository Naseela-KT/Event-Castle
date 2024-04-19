import { changeStatusById, createLive, findAllLive } from "../repositories/liveRepository";


export const addNewLive = async (url:string) => {
    try {
      const data = await createLive(url);
      return data;
    } catch (error) {
      throw error;
    }
  };

export const changeStatus=async (url:string) => {
    try {
      const data = await changeStatusById(url);
      return data;
    } catch (error) {
      throw error;
    }
  };


export const getAllLive= async() => {
    try {
      const data = await findAllLive();
      return data;
    } catch (error) {
      throw error;
    }
  };