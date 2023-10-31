import Card from '../../components/card/Card';
import { RiLockPasswordLine } from 'react-icons/ri';
import styles from './auth.module.scss';
import ForgotImg from '../../assets/New folder/restpassss.webp';
import Logo from '../../components/logo/Logo';
import PasswordInput from '../../components/Input/PasswordInput';

import PassStrength from '../../components/Input/PassStrength';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { resetPassword, RESET } from '../../redux/features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ShowSpinnerOrText from '../../components/helpper/ShowSpinnerOrText';

const initialData = {
  newPassword: '',
  newPassword2: '',
};
const Reset = () => {
  const [newPass, setNewPass] = useState(initialData);
  const { newPassword, newPassword2 } = newPass;

  const [isShow, setIsShow] = useState(false);
  const dispatch = useDispatch();
  const { isSuccess, message } = useSelector((state) => state.auth);
  const { resetToken } = useParams();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPass({ ...newPass, [name]: value });
    newPassword.length === 0 ? setIsShow(false) : setIsShow(true);
  };

  const resetPass = async (e) => {
    e.preventDefault();
    if (!newPassword) {
      return toast.error('Please enter an new password');
    }
    if (newPassword.length < 8) {
      return toast.error('Password must be up to 8 characters client');
    }
    if (
      !newPassword.match(/([!,%,&,@,#,$,^,*,?,_,~])/) ||
      !newPassword.match(/([0-9])/) ||
      !newPassword.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)
    ) {
      toast.warn(' For more security please use password rules.');
    }

    if (newPassword !== newPassword2) {
      return toast.error('Passwords do not match');
    }

    const userData = {
      password: newPassword,
    };

    await dispatch(resetPassword({ userData, resetToken }));
  };
  useEffect(() => {
    if (isSuccess && message.includes('reset successful')) {
      navigate('/login');
    }

    dispatch(RESET());
  }, [dispatch, navigate, message, isSuccess]);

  return (
    <div className={`container  ${styles.auth}`}>
      <Card>
        <div className={`${styles.form} `}>
          <div className={`--ml ${styles.cardForm}`}>
            <Logo />
            <br />
            <form onSubmit={resetPass}>
              <PasswordInput
                placeholder='New Password'
                name='newPassword'
                value={newPassword}
                onChange={handleInputChange}
                // onPaste={}
              />
              <PasswordInput
                placeholder='Confirm New Password'
                name='newPassword2'
                value={newPassword2}
                onChange={handleInputChange}
                // onPaste={}
              />
              {isShow ? <PassStrength password={newPassword} /> : null}
              <br />

              <button type='submit' className='--btn --btn-logo --btn-block'>
                <ShowSpinnerOrText
                  text={'Reset Password'}
                  icon={<RiLockPasswordLine className={styles.btn} />}
                />
              </button>
            </form>
          </div>
          <div className='cardImg'>
            <img className={styles.img} src={ForgotImg} alt='Forgot Image' />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Reset;
