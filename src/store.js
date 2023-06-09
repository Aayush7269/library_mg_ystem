import { configureStore } from "@reduxjs/toolkit";
import adminReducer from './pages/user/userSlice'



const store = configureStore({
    reducer:{
        adminInfo: adminReducer,
    },
})
export default store;