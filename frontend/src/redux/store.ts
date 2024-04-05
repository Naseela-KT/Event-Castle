import {configureStore} from '@reduxjs/toolkit';
import userReducer from "./slices/UserSlice"
import adminReducer from './slices/AdminSlice';
import vendorReducer from  './slices/VendorSlice';
import {persistReducer,persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";//localstorage


const persistConfigUser = {
    storage,
    key:"user"
}
const persistConfigAdmin = {
    storage,
    key:"admin"
}
const persistConfigVendor = {
    storage,
    key:"vendor"
}

const persistedUserreducer = persistReducer(persistConfigUser,userReducer)
const persistedAdminreducer = persistReducer(persistConfigAdmin,adminReducer)
const persistedVendorreducer = persistReducer(persistConfigVendor,vendorReducer)

 export const store= configureStore({
    reducer:{
        user :persistedUserreducer,
        admin :persistedAdminreducer,
        vendor :persistedVendorreducer,
    }
    
})
export const persistor=persistStore(store)