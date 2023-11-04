import Card from '../../components/card/Card';
import { GoPersonAdd } from 'react-icons/go';
import { TbArrowBackUpDouble } from 'react-icons/tb';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../components/logo/Logo';
import RegisterImg from '../../assets/New folder/singup.png';
import PasswordInput from '../../components/Input/PasswordInput';
import { useEffect, useState } from 'react';
import styles from './auth.module.scss';
import PhoneNumberInput from '../../components/Input/PhoneNumberInput';
import PassStrength from '../../components/Input/PassStrength';
import { toast } from 'react-toastify';
import { validateEmail } from '../../redux/features/auth/authService';
import { useDispatch, useSelector } from 'react-redux';
import { register, sendLoginCode } from '../../redux/features/auth/authSlice';

import ShowSpinnerOrText from '../../components/helpper/ShowSpinnerOrText';
import useRedirectLoggedInUser from '../../customHook/useRedirectLoggedInUser';
import NotFound from '../notFound/NotFound';

const initialData = {
  firstName: '',
  middleName: '',
  lastName: '',
  email: '',
  password: '',
  password2: '',
};

const Register = () => {
  useRedirectLoggedInUser('/');
  const [formData, setFormData] = useState(initialData);
  const { firstName, middleName, lastName, email, password, password2 } =
    formData;
  const [phoneNumber, setPhoneNumber] = useState('');

  const [isShow, setIsShow] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isSuccess, sendCode } = useSelector((state) => state.auth);
  const { settings } = useSelector((state) => state.settings);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    password.length === 0 ? setIsShow(false) : setIsShow(true);
  };

  const registerUser = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !password) {
      return toast.error('Please fill in all the required fields.');
    }
    if (password.length < 8) {
      return toast.error('Password must be up to 8 characters client');
    }
    if (
      !password.match(/([!,%,&,@,#,$,^,*,?,_,~])/) ||
      !password.match(/([0-9])/) ||
      !password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)
    ) {
      toast.warn(' For more security please use password rules.');
    }
    if (!validateEmail(email)) {
      return toast.error('Please enter a valid email');
    }
    if (password !== password2) {
      return toast.error('Passwords do not match');
    }

    if (!phoneNumber.match(/^\+?[1-9]\d{8,14}$/)) {
      console.log(phoneNumber);
      return toast.error('Please enter a valid phone number.');
    }

    const userData = {
      firstName,
      middleName,
      lastName,
      phoneNumber,
      email,
      password,
    };
    console.log(userData);
    await dispatch(register(userData));
  };

  useEffect(() => {
    if (isSuccess && sendCode) {
      navigate(`/Login-with-code/${email}`);
      dispatch(sendLoginCode(email));
    }
  }, [sendCode, isSuccess, email, navigate, dispatch]);

  return (
    <div className={`container  ${styles.auth}`}>
      {settings.isCreate ? (
        <NotFound />
      ) : (
        <Card>
          <div className={`${styles.form}`}>
            <div className={styles.cardForm}>
              <Logo />
              <br />
              <form onSubmit={registerUser}>
                <div className='--flex-between '>
                  <div className='--mr'>
                    <input
                      type='text'
                      placeholder='First Name'
                      name='firstName'
                      value={firstName}
                      onChange={handleInputChange}
                      // required
                    />
                  </div>
                  <input
                    type='text'
                    placeholder='Middle Name'
                    name='middleName'
                    value={middleName}
                    onChange={handleInputChange}
                  />
                </div>
                <input
                  type='text'
                  placeholder='Last Name'
                  name='lastName'
                  value={lastName}
                  onChange={handleInputChange}
                  // required
                />
                <input
                  // type='email'
                  type='text'
                  placeholder='Email'
                  name='email'
                  value={email}
                  onChange={handleInputChange}
                  // required
                />

                <PhoneNumberInput setPhoneNumber={setPhoneNumber} />

                <PasswordInput
                  placeholder='Password'
                  name='password'
                  value={password}
                  onChange={handleInputChange}
                  // onPaste={}
                />
                <PasswordInput
                  placeholder='Confirm Password'
                  name='password2'
                  value={password2}
                  onChange={handleInputChange}
                  onPaste={(e) => {
                    e.preventDefault();
                    toast.error('Cannot paste into input field');
                    return false;
                  }}
                />
                {isShow ? <PassStrength password={password} /> : null}

                <br />
                <button type='submit' className='--btn --btn-logo --btn-block '>
                  <ShowSpinnerOrText
                    text={'Register'}
                    icon={<GoPersonAdd size={20} className={styles.btn} />}
                  />
                </button>
              </form>

              <span className={styles.register}>
                <p>Already have an account? &nbsp;</p>
                <Link to='/login'>Login</Link>
              </span>
            </div>
            <div className={`${styles.cardImg} `}>
              <img src={RegisterImg} alt='Register Image' />
              <p className='--flex-end '>
                <Link to='/'>
                  Go Back
                  <TbArrowBackUpDouble size={25} color='#ee7483' />
                </Link>
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Register;
