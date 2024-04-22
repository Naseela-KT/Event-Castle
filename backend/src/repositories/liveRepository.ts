import mongoose, { Types } from "mongoose";
import live from "../models/liveModel";



export const createLive = async (url: string) => {
  try {
    return await live.create({ url });
  } catch (error) {
    throw error;
  }
};

export const changeStatusById=async(url:string)=>{
    try {
        return await live.updateOne({url:url},{$set:{finished:true}});
      } catch (error) {
        throw error;
      }
}

export const findAllLive=async()=>{
    try {
        return await live.find({finished:false});
      } catch (error) {
        throw error;
      }
}


