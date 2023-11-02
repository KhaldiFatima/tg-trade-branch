import { useEffect, useState } from 'react';

import './DashboardList.scss';
import { useDispatch, useSelector } from 'react-redux';

import Search from '../componentsDashboard/search/Search';
import { getAllTransactions } from '../../redux/features/transaction/transactionSlice';
import { shortenText } from '../../components/userName/UserName';
import { getUsers } from '../../redux/features/auth/authSlice';
import Loader from '../../components/loader/Loader';
import ReactPaginate from 'react-paginate';
import {
  FILTER_TRANS,
  selectTransactions,
} from '../../redux/features/transaction/filterTSlice';

const TransactionList = () => {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();

  const { isLoading, transactions } = useSelector((state) => state.transaction);
  const { users } = useSelector((state) => state.auth);
  const filteredTrans = useSelector(selectTransactions);

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getAllTransactions());
  }, [dispatch]);

  useEffect(() => {
    dispatch(FILTER_TRANS({ transactions, users, search }));
  }, [dispatch, transactions, users, search]);

  // const [filterTrans, setFilterTrans] = useState(
  //   filterTransactions ? filterTransactions : transactions
  // );

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
      {isLoading && <Loader />}
      <div className='table'>
        <div className='--flex-between'>
          <span>
            <h3>All Transactions</h3>
          </span>
          <span>
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </span>
        </div>
        <div className='table'>
          {!isLoading && transactions.length === 0 ? (
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
                      <td>{status}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        {itemsPerPage >= transactions.length ? null : (
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
  );
};

export default TransactionList;
