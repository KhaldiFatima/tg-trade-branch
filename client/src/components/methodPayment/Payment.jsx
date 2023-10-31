import MethodPayment from './MethodPayment';

const Payment = () => {
  return (
    <div>
      <MethodPayment />
      <div className='--flex-around '>
        <span></span>
        <button className='--btn --btn-logo --btn-w  '>Confirm</button>
      </div>
    </div>
  );
};

export default Payment;
