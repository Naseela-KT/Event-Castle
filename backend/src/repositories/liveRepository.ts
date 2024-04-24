import Live, { LiveDocument } from "../models/liveModel";
import { BaseRepository } from "./baseRepository";

class LiveRepository extends BaseRepository<LiveDocument> {
  constructor() {
    super(Live);
  }

  async changeStatusById(url: string) {
    try {
      return await Live.updateOne({ url: url }, { $set: { finished: true } });
    } catch (error) {
      throw error;
    }
  }
}

export default new LiveRepository();
