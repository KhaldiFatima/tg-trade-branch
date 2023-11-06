import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { transactionService } from './transactionService';
import { toast } from 'react-toastify';

const initialState = {
  amount: 0,
  transaction: null,
  transactionUser: [],
  transactions: [],
  transactionsPending: [],
  transactionsCompleted: [],
  transactionStatus: false,
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

export const requestDepositFunds = createAsyncThunk(
  'transaction/requestDepositFunds',
  async (transactionData, thunkAPI) => {
    try {
      return await transactionService.requestDepositFunds(transactionData);
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

export const requestWithdrawFunds = createAsyncThunk(
  'transaction/requestWithdrawFunds',
  async (transactionData, thunkAPI) => {
    try {
      return await transactionService.requestWithdrawFunds(transactionData);
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

export const upgradeTransaction = createAsyncThunk(
  'transaction/upgradeTransaction',
  async (transactionData, thunkAPI) => {
    try {
      return await transactionService.upgradeTransaction(transactionData);
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

export const getTransactionStatus = createAsyncThunk(
  'transaction/getTransactionStatus',
  async (id, thunkAPI) => {
    try {
      return await transactionService.getTransactionStatus(id);
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

export const deleteTransaction = createAsyncThunk(
  'transaction/deleteTransaction',
  async (id, thunkAPI) => {
    try {
      return await transactionService.deleteTransaction(id);
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

export const getTransactionsPending = createAsyncThunk(
  'transaction/getTransactionsPending',
  async (_, thunkAPI) => {
    try {
      return await transactionService.getTransactionsPending();
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

export const getTransactionsCompleted = createAsyncThunk(
  'transaction/getTransactionsCompleted',
  async (_, thunkAPI) => {
    try {
      return await transactionService.getTransactionsCompleted();
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

export const updateTransaction = createAsyncThunk(
  'transaction/updateTransaction',
  async ({ id, transactionData }, thunkAPI) => {
    try {
      return await transactionService.updateTransaction({
        id,
        transactionData,
      });
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

export const deleteTransactionsUser = createAsyncThunk(
  'transaction/deleteTransactionsUser',
  async (id, thunkAPI) => {
    try {
      return await transactionService.deleteTransactionsUser(id);
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

export const getTransaction = createAsyncThunk(
  'transaction/getTransaction',
  async (id, thunkAPI) => {
    try {
      return await transactionService.getTransaction(id);
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
    RESET_T(state) {
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
      })
      // --------------- request Deposit Funds ------------------//
      .addCase(requestDepositFunds.pending, (state) => {
        state.isLoading_T = true;
      })
      .addCase(requestDepositFunds.fulfilled, (state, action) => {
        state.isLoading_T = false;
        state.isSuccess_T = true;
        state.transaction = action.payload;
        toast.success('Deposit of funds successfully requested');
      })
      .addCase(requestDepositFunds.rejected, (state, action) => {
        state.isLoading_T = false;
        state.isError_T = true;
        state.transaction = null;
        state.message_T = action.payload;
        toast.error(action.payload);
      })

      // --------------- request Withdraw Funds ------------------//
      .addCase(requestWithdrawFunds.pending, (state) => {
        state.isLoading_T = true;
      })
      .addCase(requestWithdrawFunds.fulfilled, (state, action) => {
        state.isLoading_T = false;
        state.isSuccess_T = true;
        state.transaction = action.payload;
        toast.success('Withdrawal of funds successfully requested');
      })
      .addCase(requestWithdrawFunds.rejected, (state, action) => {
        state.isLoading_T = false;
        state.isError_T = true;
        state.transaction = null;
        state.message_T = action.payload;
        toast.error(action.payload);
      })
      // --------------- upgrade Transaction------------------//
      .addCase(upgradeTransaction.pending, (state) => {
        state.isLoading_T = true;
      })
      .addCase(upgradeTransaction.fulfilled, (state, action) => {
        state.isLoading_T = false;
        state.isSuccess_T = true;
        state.message_T = action.payload;
        toast.success(action.payload);
      })
      .addCase(upgradeTransaction.rejected, (state, action) => {
        state.isLoading_T = false;
        state.isError_T = true;
        state.message_T = action.payload;
        toast.error(action.payload);
      })
      // --------------- transaction Status ------------------//
      .addCase(getTransactionStatus.pending, (state) => {
        state.isLoading_T = true;
      })
      .addCase(getTransactionStatus.fulfilled, (state, action) => {
        state.isLoading_T = false;
        state.isSuccess_T = true;
        state.transactionStatus = action.payload;
      })
      .addCase(getTransactionStatus.rejected, (state, action) => {
        state.isLoading_T = false;
        state.isError_T = true;
        state.message_T = action.payload;
      })

      // --------------- delete Transaction ------------------//
      .addCase(deleteTransaction.pending, (state) => {
        state.isLoading_T = true;
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.isLoading_T = false;
        state.isSuccess_T = true;
        state.message_T = action.payload;
        toast.success(action.payload);
      })
      .addCase(deleteTransaction.rejected, (state, action) => {
        state.isLoading_T = false;
        state.isError_T = true;
        state.message_T = action.payload;
        toast.error(action.payload);
      })
      // --------------- get  transactions Pending ------------------//
      .addCase(getTransactionsPending.pending, (state) => {
        state.isLoading_T = true;
      })
      .addCase(getTransactionsPending.fulfilled, (state, action) => {
        state.isLoading_T = false;
        state.isSuccess_T = true;
        state.transactionsPending = action.payload;
      })
      .addCase(getTransactionsPending.rejected, (state, action) => {
        state.isLoading_T = false;
        state.isError_T = true;
        state.message_T = action.payload;
        toast.error(action.payload);
      })
      // --------------- get transactions Completed ------------------//
      .addCase(getTransactionsCompleted.pending, (state) => {
        state.isLoading_T = true;
      })
      .addCase(getTransactionsCompleted.fulfilled, (state, action) => {
        state.isLoading_T = false;
        state.isSuccess_T = true;
        state.transactionsCompleted = action.payload;
      })
      .addCase(getTransactionsCompleted.rejected, (state, action) => {
        state.isLoading_T = false;
        state.isError_T = true;
        state.message_T = action.payload;
        toast.error(action.payload);
      })
      // --------------- Update Transaction ------------------//
      .addCase(updateTransaction.pending, (state) => {
        state.isLoading_T = true;
      })
      .addCase(updateTransaction.fulfilled, (state, action) => {
        state.isLoading_T = false;
        state.isSuccess_T = true;
        state.transaction = action.payload;
        toast.success('Transaction Updated');
      })
      .addCase(updateTransaction.rejected, (state, action) => {
        state.isLoading_T = false;
        state.isError_T = true;
        state.message_T = action.payload;
        toast.error(action.payload);
      })
      // --------------- delete Transaction User ------------------//
      .addCase(deleteTransactionsUser.pending, (state) => {
        state.isLoading_T = true;
      })
      .addCase(deleteTransactionsUser.fulfilled, (state, action) => {
        state.isLoading_T = false;
        state.isSuccess_T = true;
        state.message_T = action.payload;
        toast.success(action.payload);
      })
      .addCase(deleteTransactionsUser.rejected, (state, action) => {
        state.isLoading_T = false;
        state.isError_T = true;
        state.message_T = action.payload;
        toast.error(action.payload);
      }) // --------------- get  transaction------------------//
      .addCase(getTransaction.pending, (state) => {
        state.isLoading_T = true;
      })
      .addCase(getTransaction.fulfilled, (state, action) => {
        state.isLoading_T = false;
        state.isSuccess_T = true;
        state.transaction = action.payload;
      })
      .addCase(getTransaction.rejected, (state, action) => {
        state.isLoading_T = false;
        state.isError_T = true;
        state.message_T = action.payload;
        toast.error(action.payload);
      });
  },
});

export const {
  RESET_T,
  CALC_PENDING_TRANSACTIONS,
  CALC_DEPOSIT,
  CALC_WITHDRAWALS,
  CALC_PENDING_USER,
} = transactionSlice.actions;

export default transactionSlice.reducer;
