import { Document, Schema, model } from "mongoose";

export const NOTIFICATION_TYPES = {
  BOOKING: "BOOKING",
  STATUS: "STATUS",
  PAYMENT: "PAYMENT",
  WALLET: "WALLET",
  REVIEW:"REVIEW",
  NEW_USER:"NEW_USER",
  NEW_VENDOR:"NEW_VENDOR"
};

export interface NotificationDocument extends Document {
  recipient: Schema.Types.ObjectId;
  message: string;
  read: boolean;
  type:string;
  createdAt:Date;
}

const notificationSchema = new Schema<NotificationDocument>(
  {
    recipient: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
    type:{
      type:String,
      required:true,
      enum: Object.values(NOTIFICATION_TYPES),
    },
    createdAt:{
      type:Date
    }
  },
  { timestamps: true }
);

export default model<NotificationDocument>("Notification", notificationSchema);
