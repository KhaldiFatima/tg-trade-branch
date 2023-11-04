import { NavLink } from 'react-router-dom';
import MethodPayment from '../methodPayment/MethodPayment';
import './InfoPage.scss';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import {
  RESET_T,
  requestDepositFunds,
  requestWithdrawFunds,
} from '../../redux/features/transaction/transactionSlice';
import { getSettings } from '../../redux/features/settings/settingsSlice';

const InfoPage = ({ title = '' }) => {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const isDisabled = !paymentMethod;

  const dispatch = useDispatch();
  const { settings } = useSelector((state) => state.settings);

  const depositFunds = async () => {
    await dispatch(getSettings());
    if (!amount || !paymentMethod) {
      return toast.error('Please fill in all the required fields.');
    }

    if (settings.isDeposit) {
      return toast.info('Deposits cancelled, Try later.');
    }

    const transactionData = {
      type: 'deposit',
      amountTrans: amount,
      paymentMethod,
    };
    console.log(transactionData);
    await dispatch(requestDepositFunds(transactionData));
    await dispatch(RESET_T());
  };

  const withdrawalFunds = async () => {
    await dispatch(getSettings());

    if (!amount || !paymentMethod) {
      return toast.error('Please fill in all the required fields.');
    }

    if (settings.isWithdrawal) {
      return toast.info('Withdrawals  cancelled, Try later.');
    }
    const transactionData = {
      type: 'withdrawal',
      amountTrans: amount,
      paymentMethod,
    };
    console.log(transactionData);
    await dispatch(requestWithdrawFunds(transactionData));
    await dispatch(RESET_T());
  };

  console.log(paymentMethod);
  return (
    <div className='info --flex-between'>
      <div className='method'>
        <MethodPayment
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
        />
      </div>

      <div className='--dir-flex-column --width-50 --m2 --p2  '>
        <input
          type='number'
          id='paypal'
          value={amount}
          placeholder='Amount $'
          onChange={(e) => setAmount(e.target.value)}
          disabled={isDisabled}
        />
        {title === 'deposit' && (
          <button
            className='--btn --btn-logo --btn-block '
            onClick={depositFunds}
          >
            <NavLink to='/deposit'>Deposit</NavLink>
          </button>
        )}
        {title === 'withdrawal' && (
          <button
            className='--btn --btn-logo --btn-block  '
            onClick={withdrawalFunds}
          >
            <NavLink to='/withdrawal'>Withdrawal</NavLink>
          </button>
        )}
      </div>
    </div>
  );
};

export default InfoPage;
