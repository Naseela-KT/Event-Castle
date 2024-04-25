export interface VendorData{
    _id:string;
    email : string;
    password : string;
    name:string;
    city:string;
    about:string;
    phone:number;
    isVerified:boolean;
    verificationRequest:boolean;
    totalBooking:number;
    vendor_type:string;
    isActive:boolean;
    coverpicUrl:string;
    logoUrl:string;
    bookedDates:Array<string>;
    totalRating:number;
}

export interface Post {
    imageUrl: string;
    _id: string;
    caption: string;
  }