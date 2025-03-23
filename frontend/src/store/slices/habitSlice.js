import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  habits: [],
};

const habitSlice = createSlice({
  name: "habits",
  initialState,
  reducers: {
    addHabit: (state, action) => {
      state.habits.push(action.payload);
    },
    removeHabit: (state, action) => {
      state.habits = state.habits.filter((habit) => habit.id !== action.payload);
    },
    setHabits:(state, action)=>{
      state.habits = action.payload
    }
  },
});

export const { addHabit, removeHabit, setHabits} = habitSlice.actions;
export default habitSlice.reducer;
