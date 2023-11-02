import { FaUsers } from 'react-icons/fa';
import './DashboardStats.scss';
import { BiUserCheck, BiUserMinus, BiUserX } from 'react-icons/bi';
import InfoBox from '../infoBox/InfoBox';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  CALC_SUSPENDED_USER,
  CALC_VERIFIED_USER,
} from '../../../redux/features/auth/authSlice';

// Icons
const icon1 = <FaUsers size={40} color='#fff' />;
const icon2 = <BiUserCheck size={40} color='#fff' />;
const icon3 = <BiUserMinus size={40} color='#fff' />;
const icon4 = <BiUserX size={40} color='#fff' />;

const UsersStats = () => {
  const dispatch = useDispatch();
  const { users, verifiedUsers, suspendedUsers } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(CALC_VERIFIED_USER());
    dispatch(CALC_SUSPENDED_USER());
  }, [dispatch, users]);

  const unverifiedUsers = users.length - verifiedUsers;

  return (
    <div className='--flex-warp '>
      <InfoBox
        icon={icon1}
        title={'Total Users'}
        count={users.length}
        bgColor='card1'
      />
      <InfoBox
        icon={icon2}
        title={'Verified Users'}
        count={verifiedUsers}
        bgColor='card2'
      />
      <InfoBox
        icon={icon3}
        title={'Unverified Users'}
        count={unverifiedUsers}
        bgColor='card3'
      />
      <InfoBox
        icon={icon4}
        title={'Suspended Users'}
        count={suspendedUsers}
        bgColor='card4'
      />
    </div>
  );
};

export default UsersStats;
