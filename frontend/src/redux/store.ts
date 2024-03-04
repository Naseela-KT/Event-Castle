import {configureStore} from '@reduxjs/toolkit';
import userReducer from "./slices/UserSlice.ts"
import adminReducer from './slices/AdminSlice.ts';
import vendorReducer from  './slices/VendorSlice.ts';
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
const persistedAdiminreducer = persistReducer(persistConfigAdmin,adminReducer)
const persistedVendorreducer = persistReducer(persistConfigVendor,vendorReducer)

 export const store= configureStore({
    reducer:{
        user :persistedUserreducer,
        admin :persistedAdiminreducer,
        vendor :persistedVendorreducer,
    }
    
})
export const persistor=persistStore(store)