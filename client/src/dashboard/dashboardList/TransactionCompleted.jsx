import { useEffect, useState } from 'react';
import './DashboardList.scss';
import { useDispatch, useSelector } from 'react-redux';
import Search from '../componentsDashboard/search/Search';
import { getTransactionsCompleted } from '../../redux/features/transaction/transactionSlice';
import { shortenText } from '../../components/userName/UserName';
import { getUsers } from '../../redux/features/auth/authSlice';
import Loader from '../../components/loader/Loader';
import ReactPaginate from 'react-paginate';
import {
  FILTER_TRANS,
  selectTransactions,
} from '../../redux/features/transaction/filterTSlice';
import { NavLink } from 'react-router-dom';

const TransactionCompleted = () => {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();

  const { isLoading_T, transactionsCompleted } = useSelector(
    (state) => state.transaction
  );

  const { users } = useSelector((state) => state.auth);
  const filteredTrans = useSelector(selectTransactions);

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getTransactionsCompleted());
  }, [dispatch]);

  const transactions = transactionsCompleted;
  useEffect(() => {
    dispatch(FILTER_TRANS({ transactions, users, search }));
  }, [dispatch, transactions, users, search]);

  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = filteredTrans.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredTrans.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredTrans.length;
    setItemOffset(newOffset);
  };

  return (
    <div className='user-summary --mt  user-list --mr'>
      {isLoading_T && <Loader />}
      <div className='table'>
        <div className='--flex-between'>
          <span>
            <h3>Transactions Completed</h3>
          </span>
          <span>
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </span>
        </div>
        <div className='table'>
          {!isLoading_T && transactionsCompleted.length === 0 ? (
            <p>No transaction found ... </p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Name</th>
                  <th>Amount</th>
                  <th>Type of Request</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((transaction, index) => {
                  const { _id, userId, type, amountTrans, status } =
                    transaction;
                  const user = users.find((user) => {
                    return user._id === userId;
                  });
                  let name;
                  user
                    ? (name = user.firstName + ' ' + user.lastName)
                    : (name = '');
                  // const { firstName, lastName } = user;
                  // const name = firstName + ' ' + lastName;
                  return (
                    <tr key={_id}>
                      <td>{itemOffset + index + 1}</td>
                      <td>{shortenText(name, 15)}</td>
                      <td>{amountTrans} $</td>
                      <td>{type}</td>
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
        {itemsPerPage >= transactionsCompleted.length ? null : (
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

        <div className='--flex-end'>
          <NavLink to='/profile'></NavLink>
        </div>
      </div>
    </div>
  );
};

export default TransactionCompleted;
