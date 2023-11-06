import paypalImg from '../../assets/New folder/PayPal_Logo.png';
import payeerImg from '../../assets/New folder/payeer.png';
import perfectMoneyImg from '../../assets/New folder//PerfectMoney.svg-.png';

import './Method.scss';
const MethodPayment = ({ paymentMethod, setPaymentMethod }) => {
  const isMethodPaypal = paymentMethod === 'paypal';
  const isMethodPayeer = paymentMethod === 'payeer';
  const isMethodPerfectMoney = paymentMethod === 'perfectMoney';

  return (
    <div className='--my2'>
      <div className='--my2'>
        <div className='--flex-around --mb2'>
          <label htmlFor='payeer'>
            &nbsp;&nbsp; <img src={payeerImg}></img>
          </label>
          <input
            name='payment_method'
            type='radio'
            id='payeer'
            value={paymentMethod}
            onChange={() => setPaymentMethod('payeer')}
            checked={isMethodPayeer}
          />
        </div>
        <div className='--flex-around --mb2'>
          <label htmlFor='paypal'>
            &nbsp;&nbsp;
            <img src={paypalImg}></img>
          </label>
          <input
            name='payment_method'
            type='radio'
            id='paypal'
            value={paymentMethod}
            onChange={() => setPaymentMethod('paypal')}
            checked={isMethodPaypal}
          />
        </div>
        <div className='--flex-around --mb2'>
          <label htmlFor='perfectMoney'>
            &nbsp;&nbsp; <img src={perfectMoneyImg}></img>
          </label>
          <input
            name='payment_method'
            type='radio'
            id='perfectMoney'
            value={paymentMethod}
            onChange={() => setPaymentMethod('perfectMoney')}
            checked={isMethodPerfectMoney}
          />
        </div>
      </div>
    </div>
  );
};

export default MethodPayment;
