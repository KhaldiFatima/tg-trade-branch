import TransactionUsers from '../transacUsers/TransactionUsers';
import OverView from '../componentsDashboard/dashboardState/OverView';

const Dashboard = () => {
  return (
    <>
      <OverView />

      <TransactionUsers />
      <TransactionUsers />
      <TransactionUsers />
    </>
  );
};

export default Dashboard;
