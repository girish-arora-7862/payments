import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPaymentApiResponse, paymentApi } from "../../api/paymentAPI";
import { IFormValues } from "../../components/PaymentPopUp";

export interface ILogin {
  username: string;
  password: string;
}

export interface DataState {
  isLoggedIn: boolean;
  isLoading: boolean;
  paymentResponse: null | IPaymentApiResponse;
}

const initialState: DataState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true" || false,
  isLoading: false,
  paymentResponse: null,
};

export const makePayment = createAsyncThunk(
  "makePayment",
  async (values: IFormValues) => {
    try {
      const response = await paymentApi(values);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const counterSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<ILogin>) => {
      localStorage.setItem("isLoggedIn", "true");
      state.isLoggedIn = true;
    },
    logoutUser: (state) => {
      localStorage.setItem("isLoggedIn", "false");
      state.isLoggedIn = false;
    },
    resetPaymentResponse: (state) => {
      state.paymentResponse = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(makePayment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(makePayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.paymentResponse = action.payload as IPaymentApiResponse;
      })
      .addCase(makePayment.rejected, (state, action) => {
        state.isLoading = false;
        state.paymentResponse = action.payload as IPaymentApiResponse;
      });
  },
});

export const { loginUser, logoutUser, resetPaymentResponse } =
  counterSlice.actions;

export default counterSlice.reducer;
