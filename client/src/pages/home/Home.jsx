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

  const { isLoading, transactionUser, pendingTransUser } = useSelector(
    (state) => state.transaction
  );
  const { amount, isLoadingA } = useSelector((state) => state.amount);

  const userAmount = isLoadingA ? `Amount $` : `${amount.amount} $`;

  useEffect(() => {
    dispatch(getUSerTransactions());
    dispatch(CALC_PENDING_USER());
  }, [dispatch]);

  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 9;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = transactionUser.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(transactionUser.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % transactionUser.length;
    setItemOffset(newOffset);
  };

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
          <div className='--dir-flex-column --width-50 --m2 --p2  '>
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
            {!isLoading && transactionUser.length === 0 ? (
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
                  {currentItems.map((transaction, index) => {
                    const { _id, type, amountTrans, status, date } =
                      transaction;
                    return (
                      <tr key={_id}>
                        <td>{itemOffset + index + 1}</td>
                        <td>{type}</td>
                        <td>{amountTrans} $</td>
                        <td>{moment(date).format('DD MM YYYY hh:mm a')}</td>
                        <td>{status}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
          {itemsPerPage >= transactionUser.length ? null : (
            <ReactPaginate
              breakLabel='...'
              nextLabel='>'
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              pageCount={pageCount}
              previousLabel='<'
              renderOnZeroPageCount={null}
              containerClassName='pagination'
              pageLinkClassName='page-num'
              previousLinkClassName='page-num'
              nextLinkClassName='page-num'
              activeLinkClassName='activePage'
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
