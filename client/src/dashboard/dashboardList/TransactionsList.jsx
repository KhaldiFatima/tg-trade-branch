import { useEffect } from 'react';

import './DashboardList.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../redux/features/auth/authSlice';
import Table from '../../components/table/Table';
import HeaderInfo from '../headerInfo/HeaderInfo';
const TransactionList = () => {
  const { isLoggedIn, isSuccess, users } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <>
      {/* <div className='--flex-between'> */}
      <div className='user-summary --mt  user-list --mr'>
        {/* {isLoading && <Spinner />} */}
        <div className='table'>
          <HeaderInfo title={'All Transactions'} />
          <Table />
        </div>
      </div>
    </>
  );
};

export default TransactionList;
