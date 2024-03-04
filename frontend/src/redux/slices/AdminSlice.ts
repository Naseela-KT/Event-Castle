import { createSlice } from "@reduxjs/toolkit";

//represents the structure of user data
export interface AdminData{
    name:string,
    email:string ,
    id : string,
}
export interface AdminState{
    admindata : AdminData | null;
}
const initialState : AdminState ={
    admindata:null,
}

const adminSlice =createSlice({
    name:'admin',
    initialState,
    reducers:{

        setAdminInfo:(state,action)=>{
            state.admindata =action.payload
            
        },
       
        logout:(state)=>{
            state.admindata=null;
            
        }


    }
})

export const {setAdminInfo,logout} = adminSlice.actions;
export default adminSlice.reducer;


