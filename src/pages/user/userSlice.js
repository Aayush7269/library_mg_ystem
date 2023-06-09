import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    admin:{}
}

const userSlice = createSlice(
    {
        name:'user',
        initialState,
         reducers:{
            setAdmin:(state, {payload})=>{
                state.admin =payload
            }
         }
    }
)
const{reducer, actions} = userSlice
export const {setAdmin} = actions

export default reducer