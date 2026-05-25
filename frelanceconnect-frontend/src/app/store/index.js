import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/auth.slice";
import milestoneReducer from "./slices/milestone.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    milestone: milestoneReducer,
  },
});

export default store;