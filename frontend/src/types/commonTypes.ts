import { UserData } from "./userTypes";
import { VendorData } from "./vendorTypes";

export interface Review{
  _id:string;
  userId: UserData;
  rating: number;
  content: string;
  reply:Array<string>
}

export interface Notification{
    _id:string;
    message: string;
    read: boolean;
    createdAt: string;
}

export interface Booking {
  _id:string;
  date: string;
  name: string;
  eventName: string;
  city: string;
  pin: number;
  mobile: number;
  createdAt: Date;
  vendorId: string;
  userId: string;
  status: string;
  payment_status: string;
  amount: number;
}

export interface Payment {
  _id: string;
  amount: number;
  vendorId: VendorData;
  userId: UserData;
  bookingId: Booking;
  createdAt: Date;
}

export interface VendorType {
  _id: string;
  type: string;
  status: boolean;
}

