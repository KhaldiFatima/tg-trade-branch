import { useEffect, useLayoutEffect, useState } from 'react';
import MethodPayment from '../../components/methodPayment/MethodPayment';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {
  getTransaction,
  getUSerTransactions,
  updateTransaction,
} from '../../redux/features/transaction/transactionSlice';
import Loader, { LoaderImage } from '../../components/loader/Loader';

import { TbArrowBackUpDouble } from 'react-icons/tb';
import { toast } from 'react-toastify';

const EditTransaction = () => {
  const dispatch = useDispatch();

  const { transaction, isLoading_T, isSuccess_T } = useSelector(
    (state) => state.transaction
  );
  const transactionId = useParams();
  const id = transactionId.id;

  useEffect(() => {
    dispatch(getTransaction(id));
  }, [dispatch, id]);

  const [paymentMethod, setPaymentMethod] = useState(
    transaction?.paymentMethod
  );
  const [amount, setAmount] = useState(transaction?.amountTrans);
  const [type, setType] = useState(transaction?.type);
  const isDisabled = !paymentMethod;

  const isDeposit = type === 'deposit';
  const isWithdrawal = type === 'withdrawal';

  useLayoutEffect(() => {
    if (transaction) {
      setPaymentMethod(transaction.paymentMethod);
      setAmount(transaction.amountTrans);
      setType(transaction.type);
    }
  }, [transaction]);

  const update = async (e) => {
    e.preventDefault();
    try {
      if (!amount || !paymentMethod) {
        return toast.error('Please fill in all the required fields.');
      }

      const transactionData = {
        type,
        amountTrans: amount,
        paymentMethod,
      };

      await dispatch(updateTransaction({ id, transactionData }));
      if (isSuccess_T && transaction) {
        await dispatch(getUSerTransactions());
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading_T ? (
        <>
          <LoaderImage />
          <Loader />
        </>
      ) : (
        <>
          <div className='info --flex-between'>
            <div className='method'>
              <MethodPayment
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
              />
            </div>

            <div className='--dir-flex-column --width-50 --ml2  --p '>
              <input
                type='number'
                id='paypal'
                value={amount}
                placeholder='Amount $'
                onChange={(e) => setAmount(e.target.value)}
                disabled={isDisabled}
              />
              <div className='method  --p --text-p --width-100 --fw-bold'>
                <div className='--flex-between --my2'>
                  <label htmlFor='deposit'>&nbsp;&nbsp; Deposit</label>
                  <input
                    name='type'
                    type='radio'
                    id='deposit'
                    value={type}
                    onChange={() => setType('deposit')}
                    checked={isDeposit}
                  />
                </div>
                <div className='--flex-between --my2 '>
                  <label htmlFor='withdrawal'>&nbsp;&nbsp; Withdrawal</label>
                  <input
                    name='type'
                    type='radio'
                    id='withdrawal'
                    value={type}
                    onChange={() => setType('withdrawal')}
                    checked={isWithdrawal}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className='--flex-between '>
            <Link to='/transactions'>
              <TbArrowBackUpDouble size={25} color='#ee7483' />
              Go Back
            </Link>
            <button type='submit' className='--btn --btn-logo' onClick={update}>
              Update Transaction
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default EditTransaction;
