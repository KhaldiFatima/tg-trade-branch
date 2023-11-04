import './Home.scss';
import '../../dashboard/dashboardList/DashboardList.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  CALC_PENDING_USER,
  getUSerTransactions,
} from '../../redux/features/transaction/transactionSlice';
import ReactPaginate from 'react-paginate';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
import InfoBox from '../../dashboard/componentsDashboard/infoBox/InfoBox';
import { GiTakeMyMoney } from 'react-icons/gi';
import { TbProgressBolt } from 'react-icons/tb';

const icon1 = <GiTakeMyMoney size={40} color='#fff' />;
const icon2 = <TbProgressBolt size={40} color='#fff' />;
const Home = () => {
  const dispatch = useDispatch();

  const { isLoading_T, transactionUser, pendingTransUser } = useSelector(
    (state) => state.transaction
  );
  const { amount, isLoadingA } = useSelector((state) => state.amount);

  const userAmount = isLoadingA ? `Amount $` : `${amount.amount} $`;

  useEffect(() => {
    dispatch(getUSerTransactions());
    dispatch(CALC_PENDING_USER());
  }, [dispatch]);

  return (
    <>
      <>
        <div className='info --flex-between'>
          <div className='method'>
            <InfoBox
              icon={icon1}
              title={'Total Transactions'}
              count={transactionUser.length}
              bgColor='card1'
            />
            <InfoBox
              icon={icon2}
              title={'Pending Transactions'}
              count={pendingTransUser}
              bgColor='card2'
            />
          </div>
          <div className='--dir-flex-column --width-50 --m2  '>
            <input
              type='text'
              value={userAmount}
              // placeholder='Amount $'
              disabled
            />
            <button className='--btn --btn-logo --btn-block  '>
              <NavLink to='/deposit'>Deposit</NavLink>
            </button>
            <button className='--btn --btn-logo --btn-block  '>
              <NavLink to='/withdrawal'>Withdrawal</NavLink>
            </button>
          </div>
        </div>
      </>
      {/* <Table title={'Transaction'} /> */}
      <div className='user-summary --mt  user-list --mr'>
        <div className='table'>
          <div className='--flex-between'>
            <span>
              <h3>Transactions</h3>
            </span>
          </div>
          <div className='table'>
            {!isLoading_T && transactionUser.length === 0 ? (
              <p>No transaction found ... </p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>s/n</th>
                    <th>Type of Request</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactionUser.map((transaction, index) => {
                    const { _id, type, amountTrans, status, date } =
                      transaction;
                    if (index >= 9) {
                      return;
                    }
                    return (
                      <tr key={_id}>
                        <td>{index + 1}</td>
                        <td>{type}</td>
                        <td>{amountTrans} $</td>
                        <td>{moment(date).format('DD MM YYYY hh:mm a')}</td>
                        <td>
                          <p
                            className={
                              (status === 'Accepted' && '--td-green') ||
                              (status === 'Rejected' && '--td-red') ||
                              '--p-td'
                            }
                          >
                            {status}
                          </p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
