import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { amountService } from './amountService';
import { toast } from 'react-toastify';

const initialState = {
  amount: 0,
  isError: false,
  isSuccess: false,
  isLoadingA: false,
  message: '',
};

export const getAmount = createAsyncThunk(
  'amount/getAmount',
  async (_, thunkAPI) => {
    try {
      return await amountService.getAmount();
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

export const updateAmount = createAsyncThunk(
  'amount/updateAmount',
  async (id, thunkAPI) => {
    try {
      return await amountService.updateAmount(id);
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

const amountSlice = createSlice({
  name: 'amount',
  initialState,
  reducers: {
    RESET_A(state) {
      state.isError = false;
      state.isSuccess = false;
      state.isLoadingA = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // --------------- get User ------------------//
      .addCase(getAmount.pending, (state) => {
        state.isLoadingA = true;
      })
      .addCase(getAmount.fulfilled, (state, action) => {
        state.isLoadingA = false;
        state.isSuccess = true;
        state.amount = action.payload;
        console.log(action.payload);
      })
      .addCase(getAmount.rejected, (state, action) => {
        state.isLoadingA = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // --------------- update Amount ------------------//
      .addCase(updateAmount.pending, (state) => {
        state.isLoadingA = true;
      })
      .addCase(updateAmount.fulfilled, (state, action) => {
        state.isLoadingA = false;
        state.isSuccess = true;
        state.amount = action.payload;
        toast.success('User amount updated');
      })
      .addCase(updateAmount.rejected, (state, action) => {
        state.isLoadingA = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { RESET_A } = amountSlice.actions;

export default amountSlice.reducer;
