import ReactPaginate from 'react-paginate';
import moment from 'moment';
import { useEffect, useState } from 'react';
import {
  deleteTransaction,
  getUSerTransactions,
} from '../../redux/features/transaction/transactionSlice';
import { useDispatch, useSelector } from 'react-redux';
import { FaTrashAlt } from 'react-icons/fa';
import { MdUpdate } from 'react-icons/md';
import { confirmAlert } from 'react-confirm-alert';
import { useNavigate } from 'react-router-dom';
import noData from '../../assets/New folder/noData.png';
import { toast } from 'react-toastify';

const Transaction = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading_T, transactionUser } = useSelector(
    (state) => state.transaction
  );
  const { settings } = useSelector((state) => state.settings);
  const { isAllowC, isAllowM } = settings;

  useEffect(() => {
    dispatch(getUSerTransactions());
  }, [dispatch]);

  const showTransaction = (id, status) => {
    if (status !== 'pending') {
      toast.error("You can't edit a transaction that has been.");
    } else {
      navigate(`transaction/${id}`);
    }
  };

  const delTransaction = async (id) => {
    await dispatch(deleteTransaction(id));
    await dispatch(getUSerTransactions());
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: 'Delete This Transaction',
      message: 'Are you sure to do delete this transaction ?',
      buttons: [
        {
          label: 'Delete',
          onClick: () => delTransaction(id),
        },
        {
          label: 'Cancel',
        },
      ],
    });
  };

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
              <div className='--center-all '>
                <img src={noData} alt='No transaction found...' />
                <p>No transaction found ... </p>
              </div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>s/n</th>
                    <th>Type of Request</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Payment Method</th>
                    <th>Status</th>
                    {isAllowC || isAllowM ? <th>Transaction</th> : null}
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((transaction, index) => {
                    const {
                      _id,
                      type,
                      amountTrans,
                      status,
                      date,
                      paymentMethod,
                    } = transaction;
                    return (
                      <tr key={_id}>
                        <td>{itemOffset + index + 1}</td>
                        <td>{type}</td>
                        <td>{amountTrans} $</td>
                        <td>{moment(date).format('DD MM YYYY hh:mm a')}</td>
                        <td>{paymentMethod}</td>
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
                        {isAllowC || isAllowM ? (
                          <td className='--flex-around'>
                            {isAllowC && (
                              <FaTrashAlt
                                size={20}
                                color='red'
                                onClick={() => confirmDelete(_id)}
                              />
                            )}
                            {isAllowM && (
                              <MdUpdate
                                size={25}
                                color='steelblue'
                                onClick={() => showTransaction(_id, status)}
                              />
                            )}
                          </td>
                        ) : null}
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

export default Transaction;
