import LiveRepository from "../repositories/liveRepository";

class LiveService {
  async addNewLive(url: string) {
    try {
      const data = await LiveRepository.create({ url });
      return data;
    } catch (error) {
      throw error;
    }
  }

  async changeStatus(url: string) {
    try {
      const data = await LiveRepository.changeStatusById(url);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getAllLive() {
    try {
      const data = await LiveRepository.findByCondition({ finished: false });
      return data;
    } catch (error) {
      throw error;
    }
  }
}


export default new LiveService()