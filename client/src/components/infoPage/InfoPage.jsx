import { NavLink } from 'react-router-dom';
import MethodPayment from '../methodPayment/MethodPayment';
import './InfoPage.scss';

const InfoPage = () => {
  return (
    <div className='info --flex-between'>
      <div className='method'>
        <MethodPayment />
      </div>

      <div className='--dir-flex-column --width-50 --m2 --p2  '>
        <input
          type='number'
          id='paypal'
          value='amount'
          placeholder='Amount $'
        />
        <button className='--btn --btn-logo --btn-block  '>
          <NavLink to='/deposit'>Deposit</NavLink>
        </button>
        <button className='--btn --btn-logo --btn-block  '>
          <NavLink to='/withdrawal'>Withdrawal</NavLink>
        </button>
      </div>
    </div>
  );
};

export default InfoPage;
