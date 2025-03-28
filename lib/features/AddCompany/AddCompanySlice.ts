import { createSlice } from "@reduxjs/toolkit";

const initialState={
    isShowForms:false
}
const AddCompSlice=createSlice({
    name:"AddComp",
    initialState:initialState,
    reducers:{
        AddCompany:(state,action)=>{
            const { isShowForms } = action.payload;
            state.isShowForms=isShowForms;
        }
    }
});

export const AddCompSliceReducer=AddCompSlice.reducer;
export const AddCompSliceAction=AddCompSlice.actions;