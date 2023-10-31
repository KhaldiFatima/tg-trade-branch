import axios from 'axios';
const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/v1/users`;

export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  return response.data;
};

const logout = async () => {
  const response = await axios.get(`${API_URL}/logout`);
  return response.data.message;
};

const getLoginStatus = async () => {
  const response = await axios.get(`${API_URL}/login-status`);
  return await response.data;
};

const getUser = async () => {
  const response = await axios.get(`${API_URL}/get-user`);
  return await response.data;
};

const updateUser = async (userData) => {
  const response = await axios.patch(`${API_URL}/update-user`, userData);
  return await response.data;
};

const sendVerificationEmail = async () => {
  const response = await axios.post(`${API_URL}/send-verification-email`);
  return await response.data.message;
};

const verifyUser = async (verificationToken) => {
  const response = await axios.patch(
    `${API_URL}/verify-user/${verificationToken}`
  );
  return await response.data.message;
};

const changePassword = async (userData) => {
  const response = await axios.post(`${API_URL}/change-password`, userData);
  return await response.data.message;
};

const forgotPassword = async (userData) => {
  const response = await axios.post(`${API_URL}/forgot-password`, userData);
  return await response.data.message;
};

const resetPassword = async (resetToken, userData) => {
  const response = await axios.patch(
    `${API_URL}/reset-password/${resetToken}`,
    userData
  );
  return await response.data.message;
};

const getUsers = async () => {
  const response = await axios.get(`${API_URL}/get-users`);
  return await response.data;
};

const deleteUser = async (id) => {
  const response = await axios.delete(`${API_URL}/delete-user/${id}`);
  return await response.data.message;
};

const upgradeUser = async (userData) => {
  const response = await axios.post(`${API_URL}/upgrade-user`, userData);
  return await response.data.message;
};

const getUserWithId = async (id) => {
  const response = await axios.get(`${API_URL}/get-user-with-id/${id}`);
  return await response.data;
};

const authService = {
  register,
  login,
  logout,
  getLoginStatus,
  getUser,
  updateUser,
  sendVerificationEmail,
  verifyUser,
  changePassword,
  forgotPassword,
  resetPassword,
  getUsers,
  deleteUser,
  upgradeUser,
  getUserWithId,
};

export default authService;
