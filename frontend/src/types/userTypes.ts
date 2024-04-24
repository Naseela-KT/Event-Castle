export interface UserData{
    email : string;
    password : string;
    name : string;
    phone : number;
    isActive:boolean;
    image:string;
    imageUrl:string;
    favourite:Array<string>;
    wallet:number;
    refreshToken:string;
}