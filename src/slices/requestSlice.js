import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "requests",
  initialState: null,
  reducers: {
    addRequests: (state, actions) => {
      return actions.payload;
    },
    removeRequest: (state, actions) => {
      return state?.filter((request) => request._id !== actions.payload) || [];
    },
  },
});

export const { addRequests, removeRequest } = requestSlice.actions;
export default requestSlice.reducer;
