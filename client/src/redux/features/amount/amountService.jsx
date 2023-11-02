import axios from 'axios';
const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/v1/amount`;

const getAmount = async () => {
  const response = await axios.get(`${API_URL}/amount`);
  return await response.data;
};

const updateAmount = async (id) => {
  const response = await axios.patch(`${API_URL}/update-amount`, id);
  return await response.data;
};

export const amountService = { getAmount, updateAmount };
