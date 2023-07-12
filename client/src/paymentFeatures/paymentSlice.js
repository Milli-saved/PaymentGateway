import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import paymentService from "./paymentService";

const initialState = {
  msg: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  step: 0,
};

export const createPaymentGateway1 = createAsyncThunk(
  "payment/createPaymentGateway",
  async (_, thunkAPI) => {
    try {
      return await paymentService.step1();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const createPaymentGateway2 = createAsyncThunk(
  "payment/createPaymentGateway2",
  async (_, thunkAPI) => {
    try {
      return await paymentService.step2();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const paySchoolFeeSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPaymentGateway1.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(createPaymentGateway1.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        console.log("the response when fulfilled: ", action.payload);
        state.step = 1;
      })
      .addCase(createPaymentGateway1.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.log("response when error occurs: ", action.payload);
      })
      .addCase(createPaymentGateway2.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(createPaymentGateway2.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        console.log("the response when fulfilled 2: ", action.payload);
        state.step = 2;
      })
      .addCase(createPaymentGateway2.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.log("response when error occurs 2: ", action.payload);
      });
  },
});

export default paySchoolFeeSlice.reducer;
