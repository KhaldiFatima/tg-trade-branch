import axios from 'axios';
const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/v1/transactions`;

const getAllTransactions = async () => {
  const response = await axios.get(`${API_URL}/all-transaction`);
  return await response.data;
};

const getUSerTransactions = async () => {
  const response = await axios.get(`${API_URL}/all-transaction-user`);
  return await response.data;
};

export const transactionService = { getAllTransactions, getUSerTransactions };
