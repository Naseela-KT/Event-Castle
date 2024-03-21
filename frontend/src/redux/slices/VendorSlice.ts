import { createSlice } from "@reduxjs/toolkit";


//represents the structure of user data
export interface VendorData{
    name: string;
    vendor_type:string   
    email:string;
    _id : string;
    city:string;
    mobile:number;
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


