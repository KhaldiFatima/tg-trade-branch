import TransactionUsers from '../transacUsers/TransactionUsers';
import OverView from '../componentsDashboard/dashboardState/OverView';
import moment from 'moment';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const { isLoading_T, transactions } = useSelector(
    (state) => state.transaction
  );
  return (
    <>
      <OverView />
      {/* <TransactionUsers /> */}
      <div className='user-summary  user-list'>
        <h4>Latest transactions</h4>
        <div className='table'>
          {!isLoading_T && transactions.length === 0 ? (
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
                {transactions.map((transaction, index) => {
                  const { _id, type, amountTrans, status, date } = transaction;
                  if (index >= 3) {
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
    </>
  );
};

export default Dashboard;
