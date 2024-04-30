import { CustomError } from "../error/customError";
import LiveRepository from "../repositories/liveRepository";

class LiveService {
  async addNewLive(url: string) {
    try {
      const data = await LiveRepository.create({ url });
      return data;
    } catch (error) {
      console.error("Error in addNewLive:", error);
      throw new CustomError("Failed to create a new live record.", 500);
    }
  }

  async changeStatus(url: string) {
    try {
      const data = await LiveRepository.changeStatusById(url);
      return data;
    } catch (error) {
      console.error("Error in changeStatus:", error)
      throw new CustomError("Failed to change status.", 500); 
    }
  }

  async getAllLive() {
    try {
      const data = await LiveRepository.findByCondition({ finished: false });
      return data;
    } catch (error) {
      console.error("Error in getAllLive:", error)
      throw new CustomError("Failed to retrieve live records.", 500)
    }
  }
}


export default new LiveService()