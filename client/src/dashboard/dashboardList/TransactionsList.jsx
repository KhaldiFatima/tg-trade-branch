import { useEffect, useState } from 'react';
import './DashboardList.scss';
import { useDispatch, useSelector } from 'react-redux';
import Search from '../componentsDashboard/search/Search';
import {
  getTransactionsPending,
  upgradeTransaction,
} from '../../redux/features/transaction/transactionSlice';
import { shortenText } from '../../components/userName/UserName';
import { getUsers } from '../../redux/features/auth/authSlice';
import Loader from '../../components/loader/Loader';
import ReactPaginate from 'react-paginate';
import {
  FILTER_TRANS,
  selectTransactions,
} from '../../redux/features/transaction/filterTSlice';
import { NavLink } from 'react-router-dom';
import { updateAmount } from '../../redux/features/amount/amountSlice';
import noData from '../../assets/New folder/noData.png';

const TransactionList = () => {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();

  const { isLoading_T, transactionsPending } = useSelector(
    (state) => state.transaction
  );

  const { users } = useSelector((state) => state.auth);
  const filteredTrans = useSelector(selectTransactions);

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getTransactionsPending());
  }, [dispatch]);

  const transactions = transactionsPending;
  useEffect(() => {
    dispatch(FILTER_TRANS({ transactions, users, search }));
  }, [dispatch, transactions, users, search]);

  const acceptTransaction = async (userId, id) => {
    const transactionData = {
      id,
      status: 'Accepted',
    };

    await dispatch(upgradeTransaction(transactionData));
    await dispatch(updateAmount(userId));
    await dispatch(getTransactionsPending());
  };

  const rejectTransaction = async (userId, id) => {
    const transactionData = {
      status: 'Rejected',
      id,
    };
    await dispatch(upgradeTransaction(transactionData));
    await dispatch(updateAmount(userId));
    await dispatch(getTransactionsPending());
  };

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
            <h3>Transactions</h3>
          </span>
          <span>
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </span>
        </div>
        <div className='table'>
          {!isLoading_T && transactionsPending.length === 0 ? (
            <div className='--center-all '>
              <img src={noData} alt='No transaction found...' />
              <p>No transaction found ... </p>
            </div>
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
                  const { _id, userId, type, amountTrans } = transaction;

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
                      <td className='--flex-start --mx2 '>
                        <button
                          className='--btn   --color-success '
                          onClick={() => acceptTransaction(userId, _id)}
                        >
                          Accept
                        </button>
                        <button
                          className='--btn --color-danger'
                          onClick={() => rejectTransaction(userId, _id)}
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        {itemsPerPage >= transactionsPending.length ? null : (
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

        <div className='--flex-end  --fw-bold'>
          <NavLink
            to='/dashboard/transactions/completed'
            className={'btn_show --p'}
          >
            Show Completed Transactions
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default TransactionList;
