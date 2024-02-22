import { Column } from "@/types/Columns";
import { createSlice } from "@reduxjs/toolkit";

export interface KanbanState {
  columns: Column[];
}

const initialState: KanbanState = {
  columns: [
    {
      name: "To Do",
      items: [
        { id: "task1", content: "First task" },
        { id: "task2", content: "Second task" },
        { id: "task3", content: "Third task" },
        { id: "task4", content: "Fourth task" },
        { id: "task5", content: "Fifth task" },
        { id: "task6", content: "Sixth task" },
      ],
    },
    {
      name: "In Progress",
      items: [],
    },
    {
      name: "Done",
      items: [],
    },
  ],
};

export const kanbanSlice = createSlice({
  name: "kanban",
  initialState,
  reducers: {
    setColumns: (state, action) => {
      state.columns = action.payload;
    },
  },
});

export default kanbanSlice.reducer;

export const { setColumns } = kanbanSlice.actions;
