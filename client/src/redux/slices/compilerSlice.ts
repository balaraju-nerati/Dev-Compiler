import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface CompilerSliceStateType {
    fullCode: {
        html: string;
        css: string;
        javascript: string;
    }
    currentLanguage: "html" | "css" | "javascript";
    isOwner: boolean;
    
}

const initialState: CompilerSliceStateType = {
    fullCode: {
        html:`<!-- This is just a starting code. You can modify based upon your need -->
<html lang="en">
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
        css:`body {
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
  text-align: center;
}

.container {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #333;
}

input[type="text"] {
  width: 70%;
  padding: 10px;
  margin-bottom: 10px;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background-color: #0056b3;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 5px;
}

.deleteBtn {
  float: right;
  background-color: #dc3545;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 3px;
  padding: 3px 8px;
}

.deleteBtn:hover {
  background-color: #c82333;
}`,
        javascript:`document.addEventListener('DOMContentLoaded', function() {
  const taskInput = document.getElementById('taskInput');
  const addBtn = document.getElementById('addBtn');
  const taskList = document.getElementById('taskList');

  addBtn.addEventListener('click', function() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
      const li = document.createElement('li');
      li.textContent = taskText;

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.className = 'deleteBtn';
      deleteBtn.addEventListener('click', function() {
        li.remove();
      });

      li.appendChild(deleteBtn);
      taskList.appendChild(li);
      taskInput.value = '';
    } else {
      alert('Please enter a task.');
    }
  });
});`,
    },
    currentLanguage:"html",
    isOwner: false
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
        updateFullCode: (state, action: PayloadAction<CompilerSliceStateType["fullCode"]>) =>{
            state.fullCode = action.payload
        },
        updateIsOwner: (state, action: PayloadAction<boolean>) => {
          state.isOwner = action.payload;
        },
        
    },
})

export default compilerSlice.reducer
export const {updateCurrantLanguage,updateCodeValue,updateFullCode,updateIsOwner} = compilerSlice.actions