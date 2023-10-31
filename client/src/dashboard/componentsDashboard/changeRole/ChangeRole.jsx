import { useState } from 'react';
import { BiSolidCheckCircle } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, upgradeUser } from '../../../redux/features/auth/authSlice';
import { toast } from 'react-toastify';
import {
  EMAIL_RESET,
  sendAutomatedEmail,
} from '../../../redux/features/email/emailSlice';

const ChangeRole = ({ id, email }) => {
  const [userRole, setUserRole] = useState('');
  const dispatch = useDispatch();
  const { isSuccess, isLoading } = useSelector((state) => state.auth);

  const changeRole = async (e) => {
    e.preventDefault();

    if (!userRole) {
      toast.error('Please select a role');
    }

    const userData = {
      role: userRole,
      id: id,
    };

    const emailData = {
      subject: 'Account Role Changed -TG Trade',
      send_to: email,
      reply_to: 'noReply@TgAcademy.com',
      template: 'changeRole',
      url: '/login',
    };

    await dispatch(upgradeUser(userData));

    await dispatch(sendAutomatedEmail(emailData));
    await dispatch(getUsers());
    dispatch(EMAIL_RESET());
  };
  return (
    <div className='sort'>
      <form
        className='--flex-start'
        onSubmit={(e) => changeRole(e, id, userRole)}
      >
        <select value={userRole} onChange={(e) => setUserRole(e.target.value)}>
          <option value=''>-- select --</option>
          <option value='admin'>Admin</option>
          <option value='user'>user</option>
          <option value='suspended'>Suspended</option>
        </select>

        <button style={{ border: 'none', cursor: 'pointer' }}>
          <BiSolidCheckCircle className=' --btn-logo' size={28} />
        </button>
      </form>
    </div>
  );
};

export default ChangeRole;
