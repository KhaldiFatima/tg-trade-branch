import paypalImg from '../../assets/New folder/PayPal_Logo.png';
import payeerImg from '../../assets/New folder/payeer.png';
import perfectMoneyImg from '../../assets/New folder//PerfectMoney.svg-.png';

import './Method.scss';
const MethodPayment = () => {
  return (
    <div className='--my2'>
      <div className='--flex-around --mb2'>
        <label htmlFor='payeer'>
          &nbsp;&nbsp; <img src={payeerImg}></img>
        </label>
        <input type='radio' id='payeer' value='payeer' />
      </div>
      <div className='--flex-around --mb2'>
        <label htmlFor='paypal'>
          &nbsp;&nbsp;
          <img src={paypalImg}></img>
        </label>
        <input type='radio' id='paypal' value='paypal' />
      </div>
      <div className='--flex-around --mb2'>
        <label htmlFor='perfectMoney'>
          &nbsp;&nbsp; <img src={perfectMoneyImg}></img>
        </label>
        <input
          type='radio'
          id='perfectMoney'
          name='fav_language'
          value='perfectMoney'
        />
      </div>
    </div>
  );
};

export default MethodPayment;
