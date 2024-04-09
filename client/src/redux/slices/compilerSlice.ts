import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface CompilerSliceStateType {
    fullCode: {
        html: string;
        css: string;
        javascript: string;
    }
    currentLanguage: "html" | "css" | "javascript";
    
}

const initialState: CompilerSliceStateType = {
    fullCode: {
        html:`<html lang="en">
  <body>
    <div class="container">
      <h1>Todo List</h1>
      <input type="text" id="taskInput" placeholder="Add new task...">
      <button id="addBtn">Add Task</button>
      <ul id="taskList"></ul>
    </div>
    <script src="script.js"></script>
  </body>
</html>`,
        css:"This is css code",
        javascript:"This is javascript code",
    },
    currentLanguage:"html"
}

const compilerSlice = createSlice({
    name: "compilerSlice",
    initialState,
    reducers: {
        updateCurrantLanguage:(state,action: PayloadAction<CompilerSliceStateType["currentLanguage"]>) =>{
            state.currentLanguage = action.payload;
        },
        updateCodeValue: (state,action: PayloadAction<string>) =>{
            state.fullCode[state.currentLanguage] = action.payload
        },
        
    },
})

export default compilerSlice.reducer
export const {updateCurrantLanguage,updateCodeValue} = compilerSlice.actions