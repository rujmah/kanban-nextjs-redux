import { configureStore } from "@reduxjs/toolkit";
import kanbanReducer from "./kanbanSlice";

const store = configureStore({
  reducer: {
    kanban: kanbanReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
