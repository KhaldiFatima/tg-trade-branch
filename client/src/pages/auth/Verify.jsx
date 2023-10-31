import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  RESET,
  getUser,
  verifyUser,
} from '../../redux/features/auth/authSlice';

const Verify = () => {
  const dispatch = useDispatch();
  const { verificationToken } = useParams();

  const verifyAccount = async () => {
    await dispatch(verifyUser(verificationToken));
    await dispatch(RESET());
    await dispatch(getUser());
  };

  return (
    <section>
      <div className='--center-all'>
        <h2>Account Verification</h2>
        <p>To verify your account, click the button below...</p>
        <br />
        {/* <button onClick={verifyAccount} className='--btn --btn-primary'> */}

        <button className='--btn --btn-primary' onClick={verifyAccount}>
          Verify Account
        </button>
      </div>
    </section>
  );
};

export default Verify;
