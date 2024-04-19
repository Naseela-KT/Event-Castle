import { Document, Schema, model } from "mongoose";

export interface notificationDocument extends Document {
  sender: Schema.Types.ObjectId;
  recipient: Schema.Types.ObjectId;
  message: string;
  read: boolean;
}

const notificationSchema = new Schema<notificationDocument>(
  {
    sender: {
      type: Schema.Types.ObjectId,
      required: true,
    },
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
  },
  { timestamps: true }
);

export default model<notificationDocument>("Notification", notificationSchema);
