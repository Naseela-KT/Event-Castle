import { createSlice } from "@reduxjs/toolkit";


//represents the structure of user data
export interface VendorData{
    name: string;
    vendor_type:string   
    email:string;
    id : string;
    city:string;
    mobile:number;
}
export interface VendorState{
    tutordata : VendorData | null;
}
const initialState : VendorState ={
    tutordata:null,
}

const vendorSlice =createSlice({
    name:'vendor',
    initialState,
    reducers:{

        setTutorInfo:(state,action)=>{
            state.tutordata =action.payload            
        },       
        logout:(state)=>{
            state.tutordata=null;            
        }


    }
})

export const {setTutorInfo,logout} = vendorSlice.actions
export default vendorSlice.reducer;


