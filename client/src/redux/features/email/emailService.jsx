import axios from 'axios';
import { API_URL } from '../auth/authService';

const sendAutomatedEmail = async (emailData) => {
  const response = await axios.post(
    `${API_URL}/send-automated-email`,
    emailData
  );
  return response.data.message;
};

const emailService = {
  sendAutomatedEmail,
};

export default emailService;
