import {
  RESET,
  sendVerificationEmail,
} from '../../redux/features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import './Notification.scss';

const Notification = () => {
  const dispatch = useDispatch();

  const { isLoading, user } = useSelector((state) => state.auth);

  const sendVerEmail = async () => {
    await dispatch(sendVerificationEmail());
    await dispatch(RESET());
  };
  return (
    <>
      {!isLoading && user ? (
        <div className='container'>
          <div className='alert'>
            <p>
              <b>Message:</b> &nbsp;
            </p>
            <p>
              To verify your account, check your email for a verification link.
              &nbsp;
            </p>
            <p className='v-link' onClick={sendVerEmail}>
              <b>Resend Link</b>
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Notification;
