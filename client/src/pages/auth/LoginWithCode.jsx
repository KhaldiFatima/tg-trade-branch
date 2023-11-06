import Card from '../../components/card/Card';
import { GrInsecure } from 'react-icons/gr';
import styles from './auth.module.scss';
import verifyImg from '../../assets/New folder/email.jpg';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Logo from '../../components/logo/Logo';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  RESET,
  loginWithCode,
  sendLoginCode,
} from '../../redux/features/auth/authSlice';
import { toast } from 'react-toastify';
import Loader from '../../components/loader/Loader';

const LoginWithCode = () => {
  const [loginCode, setLoginCode] = useState('');
  const { sendCode, isSuccess, isLoggedIn, twoFactor, isLoading } = useSelector(
    (state) => state.auth
  );

  const { email } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const sendUserLoginCode = async () => {
    await dispatch(sendLoginCode(email));
    // await dispatch(RESET());
  };

  const loginUser = async (e) => {
    e.preventDefault();

    if (loginCode === '') {
      return toast.error('Please fill in the login code');
    }
    if (loginCode.length !== 5) {
      return toast.error('Access code must be 5 characters');
    }

    const code = {
      loginCode,
    };

    await dispatch(loginWithCode({ code, email }));
  };

  useEffect(() => {
    if (!sendCode && isSuccess && isLoggedIn) {
      navigate('/home');
      dispatch(RESET());
    }
  }, [isSuccess, sendCode, navigate, isLoggedIn, dispatch]);

  return (
    <div className={`container  ${styles.auth}`}>
      {isLoading && <Loader />}
      <Card>
        <div className={`${styles.form} --dir-column`}>
          <br />
          <Logo />

          <img className={styles.img} src={verifyImg} alt='verify Image' />
          <div className={styles.cardForm}>
            <form onSubmit={loginUser}>
              <label className='--text-p --color-primary' htmlFor='loginCode'>
                Entre Access Code :
              </label>
              <input
                // id='loginCode'
                type='number'
                placeholder='Access Code'
                name='loginCode'
                value={loginCode}
                onChange={(e) => {
                  setLoginCode(e.target.value);
                }}
              />
              <button type='submit' className='--btn --btn-logo --btn-block'>
                Proceed To Login
                <GrInsecure className={styles.btn} />
              </button>
              <p className='--flex-start'>
                <div>Check your email for login access code</div>
              </p>
            </form>
            <br />
            <div className='--flex-between'>
              {twoFactor ? (
                <p>
                  <Link
                    className='--fw-bold'
                    to='/login'
                    onClick={() => dispatch(RESET())}
                  >
                    Go Back
                  </Link>
                </p>
              ) : (
                <p>
                  <Link className='--fw-bold' to='/home'>
                    Skip
                  </Link>
                </p>
              )}
              <p
                className=' --color-primary --fw-bold cursor'
                onClick={sendUserLoginCode}
              >
                Resent Code
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LoginWithCode;
