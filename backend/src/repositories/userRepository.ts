import User, { UserDocument } from "../models/userModel";
import { Document } from "mongoose";
import vendor from "../models/vendorModel";
import { BaseRepository } from "./baseRepository";

class UserRepository extends BaseRepository<UserDocument> {
  constructor() {
    super(User);
  }

  async findAllUsers(
    page: number,
    limit: number,
    search: string
  ): Promise<Document[] | null> {
    try {
      const query = search ? { name: { $regex: new RegExp(search, "i") } } : {};
      const users = await User.find(query)
        .skip((page - 1) * limit)
        .limit(limit);

      return users;
    } catch (error) {
      throw error;
    }
  }

  async UpdatePassword(password: string, mail: string) {
    try {
      const result = await User.updateOne(
        { email: mail },
        { password: password }
      );
      if (result.modifiedCount === 1) {
        return { success: true, message: "Password updated successfully." };
      } else {
        return {
          success: false,
          message: "User not found or password not updated.",
        };
      }
    } catch (error) {
      throw error;
    }
  }

  async getfavVendors(favs:string[], page: number, pageSize: number) {
    try {
      
      const skip = (page - 1) * pageSize;
      const favoriteVendors = await vendor
        .find({ _id: { $in: favs } })
        .skip(skip)
        .limit(pageSize)
        .exec();
      const count = await vendor.countDocuments({
        _id: { $in: favs },
      });
      return { favoriteVendors, count };
    } catch (error) {
      throw error;
    }
  }

  async deletefavVendor(userId: string, vendorId: string) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $pull: { favourite: vendorId } },
        { new: true }
      );

      if (!updatedUser) {
        throw new Error("User not found");
      }

      return updatedUser;
    } catch (error) {
      throw error;
    }
  }
}

export default new UserRepository();
