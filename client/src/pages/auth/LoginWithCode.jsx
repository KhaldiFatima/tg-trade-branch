import Card from '../../components/card/Card';
import { GrInsecure } from 'react-icons/gr';
import styles from './auth.module.scss';
import verifyImg from '../../assets/New folder/email.jpg';
import { Link } from 'react-router-dom';
import Logo from '../../components/logo/Logo';
import { useState } from 'react';
import ShowSpinnerOrText from '../../components/helpper/ShowSpinnerOrText';

const LoginWithCode = () => {
  const [accessCode, setAccessCode] = useState('');

  const loginUser = () => {};

  return (
    <div className={`container  ${styles.auth}`}>
      <Card>
        <div className={`${styles.form} --dir-column`}>
          <br />
          <Logo />

          <img className={styles.img} src={verifyImg} alt='verify Image' />
          <div className={styles.cardForm}>
            <form onSubmit={loginUser}>
              <label className='--text-p --color-primary' htmlFor='accessCode'>
                Entre Access Code :
              </label>
              <input
                id='accessCode'
                type='number'
                placeholder='Access Code'
                name='accessCode'
                value={accessCode}
                onChange={(e) => {
                  e.target.value;
                }}
                required
              />
              <button type='submit' className='--btn --btn-logo --btn-block'>
                <ShowSpinnerOrText
                  text={'Proceed To Login'}
                  icon={<GrInsecure className={styles.btn} />}
                />
              </button>
              <p className='--flex-start'>
                <div>
                  Check your email for login access code <b>&nbsp; OR &nbsp;</b>
                  <Link className='--fw-bold' to='/home'>
                    Skip
                  </Link>
                </div>
              </p>
            </form>
            <br />
            <div className='--flex-between'>
              <p>
                <Link to='/login'>Go Back</Link>
              </p>
              <p className=' --color-primary --fw-bold'>Resent Code</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LoginWithCode;
