import { CustomError } from "../error/customError";
import Live, { LiveDocument } from "../models/liveModel";
import { BaseRepository } from "./baseRepository";

class LiveRepository extends BaseRepository<LiveDocument> {
  constructor() {
    super(Live);
  }

  async changeStatusById(url: string) {
    return await Live.updateOne({ url: url }, { $set: { finished: true } });
  }
}

export default new LiveRepository();
