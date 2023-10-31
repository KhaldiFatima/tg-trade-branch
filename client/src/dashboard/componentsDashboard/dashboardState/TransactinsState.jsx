import './DashboardStats.scss';
import { BiMoneyWithdraw } from 'react-icons/bi';
import { GiPayMoney, GiTakeMyMoney } from 'react-icons/gi';

import InfoBox from '../infoBox/InfoBox';
import { TbProgressBolt } from 'react-icons/tb';
// Icons
const icon1 = <GiTakeMyMoney size={40} color='#fff' />;
const icon2 = <TbProgressBolt size={40} color='#fff' />;
const icon3 = <BiMoneyWithdraw size={40} color='#fff' />;
const icon4 = <GiPayMoney size={40} color='#fff' />;

const TransactionsStats = () => {
  return (
    <div className='--flex-warp '>
      <InfoBox
        icon={icon1}
        title={'Total Transactions'}
        // count={users.length}
        bgColor='card1'
      />
      <InfoBox
        icon={icon2}
        title={'Pending'}
        // count={verifiedUsers}
        bgColor='card2'
      />
      <InfoBox
        icon={icon3}
        title={'Deposits'}
        // count={unverifiedUsers}
        bgColor='card3'
      />
      <InfoBox
        icon={icon4}
        title={'Withdrawals'}
        // count={suspendedUsers}
        bgColor='card4'
      />
    </div>
  );
};

export default TransactionsStats;
