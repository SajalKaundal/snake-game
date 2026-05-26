import { createSlice } from "@reduxjs/toolkit";

const snakeControlSlice = createSlice({
  name:"snakeControl",
  initialState:{direction:""},
  reducers:{
    Left:(state)=>{
      state.direction = "Left"
    },
    Right:(state)=>{
      state.direction = "Right"
    },
    Up:(state)=>{
      state.direction = "Up"
    },
    Down:(state)=>{
      state.direction = "Down"
    },
    Clear:(state)=>{
      state.direction=""
    }
  }
})

export const {Left,Right,Up,Down,Clear} = snakeControlSlice.actions
export default snakeControlSlice.reducer