import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import emailReducer from './features/email/emailSlice';
import filterReducer from './features/auth/filterSlice';
import transactionReducer from './features/transaction/transactionSlice';
import filterTransactionsReducer from './features/transaction/filterTSlice';
import amountReducer from './features/amount/amountSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    email: emailReducer,
    filter: filterReducer,
    transaction: transactionReducer,
    filterTrans: filterTransactionsReducer,
    amount: amountReducer,
  },
});
