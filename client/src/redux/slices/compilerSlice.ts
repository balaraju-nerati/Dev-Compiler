import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface CompilerSliceStateType {
    html: string;
    css: string;
    javascript: string;
    currentLanguage: "html" | "css" | "javascript";
}

const initialState: CompilerSliceStateType = {
    html:"",
    css:"",
    javascript:"",
    currentLanguage:"html"
}

const compilerSlice = createSlice({
    name: "compilerSlice",
    initialState,
    reducers: {
        updateCurrantLanguage:(state,action: PayloadAction<CompilerSliceStateType["currentLanguage"]>) =>{
            state.currentLanguage = action.payload;
        },
    },
})

export default compilerSlice.reducer
export const {updateCurrantLanguage} = compilerSlice.actions