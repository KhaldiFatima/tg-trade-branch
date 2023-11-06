import { useState } from 'react';
import MethodPayment from './MethodPayment';

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState('');

  return (
    <div>
      <MethodPayment
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
      />
      <div className='--flex-around '>
        <span></span>
        <button className='--btn --btn-logo --btn-w  no-drop '>Confirm</button>
      </div>
    </div>
  );
};

export default Payment;
