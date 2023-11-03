import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { transactionService } from './transactionService';
import { toast } from 'react-toastify';

const initialState = {
  amount: 0,
  transaction: null,
  transactionUser: [],
  transactions: [],
  isError_T: false,
  isSuccess_T: false,
  isLoading_T: false,
  message_T: '',
  pendingTransactions: 0,
  deposits: 0,
  withdrawals: 0,
  pendingTransUser: 0,
};

export const getAllTransactions = createAsyncThunk(
  'transaction/getAllTransactions',
  async (_, thunkAPI) => {
    try {
      return await transactionService.getAllTransactions();
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

export const getUSerTransactions = createAsyncThunk(
  'transaction/getUSerTransactions',
  async (_, thunkAPI) => {
    try {
      return await transactionService.getUSerTransactions();
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

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    RESET(state) {
      state.isError_T = false;
      state.isSuccess_T = false;
      state.isLoading_T = false;
      state.message_T = '';
    },
    CALC_PENDING_TRANSACTIONS(state) {
      const array = [];
      state.transactions.map((user) => {
        const { status } = user;
        return array.push(status);
      });
      let count = 0;
      array.forEach((item) => {
        if (item === 'pending') {
          count += 1;
        }
      });
      state.pendingTransactions = count;
    },
    CALC_DEPOSIT(state) {
      const array = [];
      state.transactions.map((user) => {
        const { type } = user;
        return array.push(type);
      });
      let count = 0;
      array.forEach((item) => {
        if (item === 'deposit') {
          count += 1;
        }
      });
      state.deposits = count;
    },
    CALC_WITHDRAWALS(state) {
      const array = [];
      state.transactions.map((user) => {
        const { type } = user;
        return array.push(type);
      });
      let count = 0;
      array.forEach((item) => {
        if (item === 'withdrawal') {
          count += 1;
        }
      });
      state.withdrawals = count;
    },
    CALC_PENDING_USER(state) {
      const array = [];
      state.transactionUser.map((user) => {
        const { status } = user;
        return array.push(status);
      });
      let count = 0;
      array.forEach((item) => {
        if (item === 'pending') {
          count += 1;
        }
      });
      state.pendingTransUser = count;
    },
  },
  extraReducers: (builder) => {
    builder
      // --------------- get All transactions ------------------//
      .addCase(getAllTransactions.pending, (state) => {
        state.isLoading_T = true;
      })
      .addCase(getAllTransactions.fulfilled, (state, action) => {
        state.isLoading_T = false;
        state.isSuccess_T = true;
        state.transactions = action.payload;
      })
      .addCase(getAllTransactions.rejected, (state, action) => {
        state.isLoading_T = false;
        state.isError_T = true;
        state.message_T = action.payload;
        toast.error(action.payload);
      })
      // --------------- get USer transactions ------------------//
      .addCase(getUSerTransactions.pending, (state) => {
        state.isLoading_T = true;
      })
      .addCase(getUSerTransactions.fulfilled, (state, action) => {
        state.isLoading_T = false;
        state.isSuccess_T = true;
        state.transactionUser = action.payload;
      })
      .addCase(getUSerTransactions.rejected, (state, action) => {
        state.isLoading_T = false;
        state.isError_T = true;
        state.message_T = action.payload;
        toast.error(action.payload);
      });
  },
});

export const {
  RESET,
  CALC_PENDING_TRANSACTIONS,
  CALC_DEPOSIT,
  CALC_WITHDRAWALS,
  CALC_PENDING_USER,
} = transactionSlice.actions;

export default transactionSlice.reducer;
