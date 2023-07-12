import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  msg: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
};


export const paySchoolFee = createSlice({
  name: "payment",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
  },
});

export default paySchoolFee.reducer;
