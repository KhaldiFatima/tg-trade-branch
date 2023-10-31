import UsersStats from './UsersStats';
import TransactionsStats from './TransactinsState';

const OverView = () => {
  return (
    <div className='user-summary'>
      <h3>Overview</h3>
      <UsersStats />
      <TransactionsStats />
    </div>
  );
};

export default OverView;
