import Card from '../../components/card/Card';
import { BiLogInCircle } from 'react-icons/bi';
import { TbArrowBackUpDouble } from 'react-icons/tb';
import styles from './auth.module.scss';
import LoginImg from '../../assets/New folder/reg.png';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../components/logo/Logo';
import PasswordInput from '../../components/Input/PasswordInput';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { validateEmail } from '../../redux/features/auth/authService';
import { useDispatch, useSelector } from 'react-redux';
import {
  RESET,
  login,
  sendLoginCode,
} from '../../redux/features/auth/authSlice';

import ShowSpinnerOrText from '../../components/helpper/ShowSpinnerOrText';
import useRedirectLoggedInUser from '../../customHook/useRedirectLoggedInUser';

const initialState = {
  email: '',
  password: '',
};
const Login = () => {
  useRedirectLoggedInUser('/');
  const [formData, setFormData] = useState(initialState);
  const { email, password } = formData;

  const { isLoggedIn, isSuccess, isError, twoFactor } = useSelector(
    (state) => state.auth
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handelInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const loginUser = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error('All fields are required');
    }

    if (!validateEmail(email)) {
      return toast.error('Please enter a valid email');
    }

    const userData = {
      email,
      password,
    };
    await dispatch(login(userData));
  };

  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate('/home');
      dispatch(RESET());
    }
    if (isError && twoFactor) {
      navigate(`/Login-with-code/${email}`);
      console.log(email);
      dispatch(sendLoginCode(email));
    }
  }, [isSuccess, isLoggedIn, navigate, dispatch, isError, twoFactor, email]);

  return (
    <div className={`container  ${styles.auth}`}>
      <Card>
        <div className={`${styles.form}`}>
          <div className={`${styles.cardImg} `}>
            <p className='--flex-start '>
              <Link to='/'>
                <TbArrowBackUpDouble size={25} color='#ee7483' />
                Go Back
              </Link>
            </p>
            <img src={LoginImg} alt='Login Image' />
          </div>
          <div className={styles.cardForm}>
            <Logo />
            <br />
            <div className='--flex-center'>
              <button className='--btn --btn-google'>Login With Google</button>
            </div>
            <br />
            <p className='--text-center --fw-bold'>or</p>
            <form onSubmit={loginUser}>
              <input
                type='email'
                placeholder='Email'
                name='email'
                value={email}
                onChange={handelInputChange}
              />

              <PasswordInput
                placeholder='Password'
                name='password'
                value={password}
                onChange={handelInputChange}
                // onPaste={}
              />
              <Link to='/forgot' className='--flex-start'>
                Forgot Password
              </Link>
              <br />
              <button type='submit' className='--btn --btn-logo --btn-block'>
                <ShowSpinnerOrText
                  text={'Login'}
                  icon={<BiLogInCircle className={styles.btn} />}
                />
              </button>
            </form>

            <span className={styles.register}>
              <p>Don&apos;t have an account? &nbsp;</p>
              <Link to='/register'>Register</Link>
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Login;
