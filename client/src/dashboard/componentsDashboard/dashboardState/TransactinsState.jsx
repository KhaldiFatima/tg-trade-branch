import './DashboardStats.scss';
import { BiMoneyWithdraw } from 'react-icons/bi';
import { GiPayMoney, GiTakeMyMoney } from 'react-icons/gi';

import InfoBox from '../infoBox/InfoBox';
import { TbProgressBolt } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import {
  CALC_DEPOSIT,
  CALC_PENDING_TRANSACTIONS,
  CALC_WITHDRAWALS,
} from '../../../redux/features/transaction/transactionSlice';
import { useEffect } from 'react';
// Icons
const icon1 = <GiTakeMyMoney size={40} color='#fff' />;
const icon2 = <TbProgressBolt size={40} color='#fff' />;
const icon3 = <BiMoneyWithdraw size={40} color='#fff' />;
const icon4 = <GiPayMoney size={40} color='#fff' />;

const TransactionsStats = () => {
  const dispatch = useDispatch();
  const { transactions, pendingTransactions, deposits, withdrawals } =
    useSelector((state) => state.transaction);

  useEffect(() => {
    dispatch(CALC_PENDING_TRANSACTIONS());
    dispatch(CALC_DEPOSIT());
    dispatch(CALC_WITHDRAWALS());
  }, [dispatch, transactions]);
  return (
    <div className='--flex-warp '>
      <InfoBox
        icon={icon1}
        title={'Total Transactions'}
        count={transactions.length}
        bgColor='card1'
      />
      <InfoBox
        icon={icon2}
        title={'Pending Transactions'}
        count={pendingTransactions}
        bgColor='card2'
      />
      <InfoBox
        icon={icon3}
        title={'Deposits'}
        count={deposits}
        bgColor='card3'
      />
      <InfoBox
        icon={icon4}
        title={'Withdrawals'}
        count={withdrawals}
        bgColor='card4'
      />
    </div>
  );
};

export default TransactionsStats;
