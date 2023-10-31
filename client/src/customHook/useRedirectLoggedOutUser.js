import { useEffect } from 'react';
import authService from '../redux/features/auth/authService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const useRedirectLoggedOutUser = (path) => {
  const navigate = useNavigate();
  useEffect(() => {
    let isLoggerIn;
    const redirectLoggedOutUser = async () => {
      try {
        isLoggerIn = await authService.getLoginStatus();
      } catch (error) {
        console.log(error.message);
      }

      if (!isLoggerIn) {
        toast.info('Session expired, please login to continue');
        navigate(path);
        return;
      }
    };
    redirectLoggedOutUser();
  }, [navigate, path]);
};

export default useRedirectLoggedOutUser;
