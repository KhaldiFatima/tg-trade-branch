import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../redux/features/auth/authService';

const useRedirectLoggedInUser = (path) => {
  const navigate = useNavigate();
  useEffect(() => {
    let isLoggerIn;
    const redirectLoggedInUser = async () => {
      try {
        isLoggerIn = await authService.getLoginStatus();
      } catch (error) {
        console.log(error.message);
      }

      if (isLoggerIn) {
        navigate(path);
        return;
      }
    };
    redirectLoggedInUser();
  }, [navigate, path]);
};

export default useRedirectLoggedInUser;
