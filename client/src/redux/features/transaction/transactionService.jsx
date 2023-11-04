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

const requestDepositFunds = async (transactionData) => {
  const response = await axios.post(
    `${API_URL}/request-deposit-funds`,
    transactionData
  );
  return await response.data;
};

const requestWithdrawFunds = async (transactionData) => {
  const response = await axios.post(
    `${API_URL}/request-withdraw-funds`,
    transactionData
  );
  return await response.data;
};

const upgradeTransaction = async (transactionData) => {
  const response = await axios.post(
    `${API_URL}/upgrade-transaction`,
    transactionData
  );
  return await response.data;
};

const getTransactionStatus = async (id) => {
  const response = await axios.get(`${API_URL}/transaction-status/${id}`);
  return await response.data;
};

const deleteTransaction = async (id) => {
  const response = await axios.delete(`${API_URL}/delete-transaction/${id}`);
  return await response.data.message;
};

const getTransactionsPending = async () => {
  const response = await axios.get(`${API_URL}/all-transaction-pending`);
  return await response.data;
};

const getTransactionsCompleted = async () => {
  const response = await axios.get(`${API_URL}/all-transaction-completed`);
  return await response.data;
};

const updateTransaction = async ({ id, transactionData }) => {
  const response = await axios.patch(
    `${API_URL}/update-transaction/${id}`,
    transactionData
  );
  return await response.data;
};

const deleteTransactionsUser = async (id) => {
  const response = await axios.delete(
    `${API_URL}/delete-transaction-user/${id}`
  );
  return await response.data.message;
};

const getTransaction = async (id) => {
  const response = await axios.get(`${API_URL}/get-transaction/${id}`);
  return await response.data;
};

export const transactionService = {
  getAllTransactions,
  getUSerTransactions,
  requestDepositFunds,
  requestWithdrawFunds,
  upgradeTransaction,
  getTransactionStatus,
  deleteTransaction,
  getTransactionsPending,
  getTransactionsCompleted,
  updateTransaction,
  deleteTransactionsUser,
  getTransaction,
};
