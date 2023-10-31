import { RiLockPasswordLine } from 'react-icons/ri';
import PasswordInput from '../../components/Input/PasswordInput';
import PassStrength from '../../components/Input/PassStrength';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  RESET,
  changePassword,
  logout,
} from '../../redux/features/auth/authSlice';
import { sendAutomatedEmail } from '../../redux/features/email/emailSlice';
import { Spinner } from '../../components/loader/Loader';
import ShowSpinnerOrText from '../../components/helpper/ShowSpinnerOrText';

const initialData = {
  oldPassword: '',
  password: '',
  password2: '',
};

const ChangePassword = () => {
  const [newPass, setNewPass] = useState(initialData);
  const { oldPassword, password, password2 } = newPass;
  const [isShow, setIsShow] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isSuccess, message, user } = useSelector((state) => state.auth);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPass({ ...newPass, [name]: value });
    password.length === 0 ? setIsShow(false) : setIsShow(true);
  };

  const updatePassword = async (e) => {
    e.preventDefault();
    if (!oldPassword || !password || !password2) {
      return toast.error('All fields are required .');
    }
    if (
      !password.match(/([!,%,&,@,#,$,^,*,?,_,~])/) ||
      !password.match(/([0-9])/) ||
      !password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)
    ) {
      toast.warn(' For more security please use password rules.');
    }
    if (password !== password2) {
      return toast.error('Passwords do not match');
    }

    const userData = {
      oldPassword,
      password,
    };

    const emailData = {
      subject: 'Change Password - TG Trade',
      send_to: user.email,
      reply_to: 'noReply@TgAcademy.com',
      template: 'changePassword',
      url: '/forgot',
    };

    await dispatch(changePassword(userData));
    await dispatch(sendAutomatedEmail(emailData));
  };

  useEffect(() => {
    if (isSuccess && message.includes('change successful')) {
      dispatch(logout());
      navigate('/login');
    }

    dispatch(RESET());
  }, [dispatch, navigate, message, isSuccess]);

  return (
    <form onSubmit={updatePassword} style={{ width: '70%' }}>
      <h3>Do you want to change your password?</h3>
      <br />
      <PasswordInput
        placeholder='Current Password'
        name='oldPassword'
        value={oldPassword}
        onChange={handleInputChange}
        // onPaste={}
      />
      <PasswordInput
        placeholder='New Password'
        name='password'
        value={password}
        onChange={handleInputChange}
        // onPaste={}
      />
      <PasswordInput
        placeholder='Confirm New Password'
        name='password2'
        value={password2}
        onChange={handleInputChange}
        // onPaste={}
      />
      {isShow ? <PassStrength password={password} /> : null}
      <br />

      <button type='submit' className='--btn --btn-logo --btn-block'>
        <ShowSpinnerOrText
          text={'Reset Password'}
          icon={<RiLockPasswordLine className='btn' />}
        />
      </button>
    </form>
  );
};

export default ChangePassword;
