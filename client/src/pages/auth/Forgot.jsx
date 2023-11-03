import Card from '../../components/card/Card';
import { AiOutlineMail } from 'react-icons/ai';
import styles from './auth.module.scss';
import ForgotImg from '../../assets/New folder/forgotImg.webp';
import { Link } from 'react-router-dom';
import Logo from '../../components/logo/Logo';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { validateEmail } from '../../redux/features/auth/authService';
import { RESET, forgotPassword } from '../../redux/features/auth/authSlice';

import ShowSpinnerOrText from '../../components/helpper/ShowSpinnerOrText';
import Loader from '../../components/loader/Loader';
import useRedirectLoggedInUser from '../../customHook/useRedirectLoggedInUser';

const Forgot = () => {
  useRedirectLoggedInUser('/');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.auth);

  const forgotPass = async (e) => {
    e.preventDefault();

    if (!email) {
      return toast.error('Please enter an email');
    }

    if (!validateEmail(email)) {
      return toast.error('Please enter a valid email');
    }

    const userData = {
      email,
    };

    await dispatch(forgotPassword(userData));
    await dispatch(RESET());
  };
  return (
    <div className={`container  ${styles.auth}`}>
      {isLoading && <Loader />}
      <Card>
        <div className={`${styles.form} --dir-column`}>
          <br />
          <Logo />

          <img className={styles.img} src={ForgotImg} alt='Forgot Image' />
          <div className={styles.cardForm}>
            <form onSubmit={forgotPass}>
              <label className='--text-p --color-primary' htmlFor='email'>
                Entre you email :
              </label>
              <input
                id='email'
                type='email'
                placeholder='Email'
                name='email'
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <br />
              <button type='submit' className='--btn --btn-logo --btn-block'>
                <ShowSpinnerOrText
                  text={' Get Reset Email'}
                  icon={<AiOutlineMail className={styles.btn} />}
                />
              </button>
            </form>
            <Link to='/login'>Go Back</Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Forgot;
