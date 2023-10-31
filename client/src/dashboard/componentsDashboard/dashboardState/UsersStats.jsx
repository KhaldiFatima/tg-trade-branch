import { FaUsers } from 'react-icons/fa';
import './DashboardStats.scss';
import { BiUserCheck, BiUserMinus, BiUserX } from 'react-icons/bi';
import InfoBox from '../infoBox/InfoBox';
// Icons
const icon1 = <FaUsers size={40} color='#fff' />;
const icon2 = <BiUserCheck size={40} color='#fff' />;
const icon3 = <BiUserMinus size={40} color='#fff' />;
const icon4 = <BiUserX size={40} color='#fff' />;

const UsersStats = () => {
  return (
    <div className='--flex-warp '>
      <InfoBox
        icon={icon1}
        title={'Total Users'}
        // count={users.length}
        bgColor='card1'
      />
      <InfoBox
        icon={icon2}
        title={'Verified Users'}
        // count={verifiedUsers}
        bgColor='card2'
      />
      <InfoBox
        icon={icon3}
        title={'Unverified Users'}
        // count={unverifiedUsers}
        bgColor='card3'
      />
      <InfoBox
        icon={icon4}
        title={'Suspended Users'}
        // count={suspendedUsers}
        bgColor='card4'
      />
    </div>
  );
};

export default UsersStats;
