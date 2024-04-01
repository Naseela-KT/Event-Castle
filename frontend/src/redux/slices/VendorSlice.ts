import { createSlice } from "@reduxjs/toolkit";

interface Review {
    username: string;
    rating: number;
    content: string;
  }
//represents the structure of user data
export interface VendorData{
    name: string;
    vendor_type:string   
    email:string;
    _id : string;
    city:string;
    phone:number;
    coverpicUrl:string;
    logoUrl:string;
    reviews:Array<Review>
}
export interface VendorState{
    isVendorSignedIn: boolean;
    vendordata : VendorData | null;
}
const initialState : VendorState ={
    vendordata:null,
    isVendorSignedIn:false
}

const vendorSlice =createSlice({
    name:'vendor',
    initialState,
    reducers:{

        setVendorInfo:(state,action)=>{
            state.vendordata =action.payload  
            state.isVendorSignedIn=true          
        },       
        logout:(state)=>{
            state.vendordata=null;   
            state.isVendorSignedIn=false         
        }


    }
})

export const {setVendorInfo,logout} = vendorSlice.actions
export default vendorSlice.reducer;


