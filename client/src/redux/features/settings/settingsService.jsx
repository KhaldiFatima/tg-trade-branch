import axios from 'axios';
const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;
export const Settings_URL = `${BACKEND_URL}/api/v1/settings`;

const getSettings = async () => {
  const response = await axios.get(`${Settings_URL}/get-settings`);
  return response.data;
};

const updateSettings = async (settingsData) => {
  const response = await axios.patch(
    `${Settings_URL}/update-settings`,
    settingsData
  );
  return response.data;
};

const settingsService = { getSettings, updateSettings };
export default settingsService;
