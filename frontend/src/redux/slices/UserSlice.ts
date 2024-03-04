import {createSlice} from '@reduxjs/toolkit';

//represents the structure of user data
export interface UserData{
    name:string,
    email:string,
    _id:string
}

export interface UserState{
    userdata : UserData | null;
}

const initialState :UserState ={
    userdata:null,
}

 const userSlice =createSlice({
    name:"user",
    initialState,
    reducers:{
    setUserInfo :(state,action)=>{
        state.userdata = action.payload;
    },
    logout:(state)=>{
        state.userdata = null;
    }

    }
})

export const  {setUserInfo,logout} = userSlice.actions;
export default userSlice.reducer;