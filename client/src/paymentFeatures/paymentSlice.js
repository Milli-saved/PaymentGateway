import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import paymentService from "./paymentService";

const initialState = {
  msg: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  step: 0,
  error: "",
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
export const createPaymentGateway3 = createAsyncThunk(
  "payment/createPaymentGateway3",
  async (_, thunkAPI) => {
    try {
      return await paymentService.step3();
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
export const createPaymentGateway4 = createAsyncThunk(
  "payment/createPaymentGateway4",
  async (_, thunkAPI) => {
    try {
      return await paymentService.step4();
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
        state.msg = action.payload;
      })
      .addCase(createPaymentGateway1.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.log("response when error occurs: ", action.payload);
        state.error = action.payload;
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
        state.msg = action.action;
      })
      .addCase(createPaymentGateway2.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.log("response when error occurs 2: ", action.payload);
        state.error = action.payload;
      })
      .addCase(createPaymentGateway3.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(createPaymentGateway3.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        console.log("the response when fulfilled 3: ", action.payload);
        state.step = 3;
        state.msg = action.payload;
      })
      .addCase(createPaymentGateway3.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.log("response when error occurs 3: ", action.payload);
        state.error = action.payload;
      })
      .addCase(createPaymentGateway4.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(createPaymentGateway4.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        console.log("the response when fulfilled 4: ", action.payload);
        state.step = 4;
        state.msg = action.payload;
      })
      .addCase(createPaymentGateway4.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.log("response when error occurs 4: ", action.payload);
        state.error = action.payload;
      });
  },
});

export default paySchoolFeeSlice.reducer;
