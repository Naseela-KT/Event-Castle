import { createSlice } from "@reduxjs/toolkit";
import { AdminData } from "../../types/adminTypes";
//represents the structure of user data
// export interface AdminData{
//     email:string ,
//     wallet:number,
//     _id : string,
// }

export interface AdminState{
    admindata : AdminData | null;
    isAdminSignedIn: boolean;
}
const initialState : AdminState ={
    admindata:null,
    isAdminSignedIn:false
}

const adminSlice =createSlice({
    name:'admin',
    initialState,
    reducers:{
        setAdminInfo:(state,action)=>{
            state.admindata=action.payload
            state.isAdminSignedIn=true
        },
       
        logout:(state)=>{
            state.admindata=null;
            state.isAdminSignedIn=false;
        }


    }
})

export const {setAdminInfo,logout} = adminSlice.actions;


export default adminSlice.reducer;


