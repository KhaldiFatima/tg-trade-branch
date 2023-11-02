import ReactPaginate from 'react-paginate';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { getUSerTransactions } from '../../redux/features/transaction/transactionSlice';
import { useDispatch, useSelector } from 'react-redux';
import { FaTrashAlt } from 'react-icons/fa';
import { MdUpdate } from 'react-icons/md';
import { confirmAlert } from 'react-confirm-alert';

const Transaction = () => {
  const dispatch = useDispatch();

  const { isLoading, transactionUser } = useSelector(
    (state) => state.transaction
  );

  useEffect(() => {
    dispatch(getUSerTransactions());
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

  const delUser = async (id) => {
    id;
    // await dispatch(deleteTransaction(id));
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: 'Delete This User',
      message: 'Are you sure to do delete this user?',
      buttons: [
        {
          label: 'Delete',
          onClick: () => delUser(id),
        },
        {
          label: 'Cancel',
        },
      ],
    });
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
                    <th>Payment Method</th>
                    <th>Status</th>
                    <th>Transaction</th>
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
                          <p className='--p-td '> {status}</p>
                        </td>

                        <td className='--flex-around'>
                          <FaTrashAlt
                            size={20}
                            color='red'
                            onClick={() => confirmDelete(_id)}
                          />
                          <MdUpdate
                            size={25}
                            color='steelblue'
                            // onClick={() => showProfile(_id)}
                          />
                        </td>
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
