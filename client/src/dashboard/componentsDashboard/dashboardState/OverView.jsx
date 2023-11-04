import UsersStats from './UsersStats';
import TransactionsStats from './TransactinsState';

const OverView = () => {
  return (
    <>
      <div className='user-summary --mb2'>
        <h3>Overview</h3>
        <UsersStats />
        <br />
        <TransactionsStats />
      </div>
    </>
  );
};

export default OverView;
