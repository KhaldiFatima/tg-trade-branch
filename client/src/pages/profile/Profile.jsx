import { FaTrashAlt } from 'react-icons/fa';
import PhoneNumberInput from '../../components/Input/PhoneNumberInput';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getUserWithId } from '../../redux/features/auth/authSlice';
import { TbArrowBackUpDouble } from 'react-icons/tb';
// import img from '../../assets/New folder/p.png';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Link, useParams } from 'react-router-dom';

import { useEffect } from 'react';
import { deleteTransactionsUser } from '../../redux/features/transaction/transactionSlice';

const Profile = () => {
  const { thisUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const userId = useParams();
  const id = userId.id;
  useEffect(() => {
    dispatch(getUserWithId(id));
  }, [dispatch, id]);

  console.log(thisUser);
  const profile = {
    id: thisUser?._id || '',
    firstName: thisUser?.firstName || '',
    middleName: thisUser?.middleName,
    lastName: thisUser?.lastName || '',
    email: thisUser?.email || '',
    phoneNumber: thisUser?.phoneNumber || '',
    avatar: thisUser?.avatar || '',
    role: thisUser?.role || '',
    isVerified: thisUser?.isVerified || false,
    amount: thisUser?.amount || 0,
  };

  const {
    _id,
    firstName,
    middleName,
    lastName,
    email,
    phoneNumber,
    avatar,
    role,
    isVerified,
    amount,
  } = profile;

  console.log(amount);
  const delUser = async (id) => {
    await dispatch(deleteUser(id));
    await dispatch(deleteTransactionsUser(id));
  };

  const confirmDelete = (e, id) => {
    e.preventDefault();
    confirmAlert({
      title: 'Delete This User',
      message: 'Are you sure to do delete this user?',
      buttons: [
        {
          label: 'Delete',
          onClick: () => delUser(id),
        },
        {
          label: 'Cancel',
        },
      ],
    });
  };

  return (
    //  <div className='home-dashboard'>{children}</div>

    <div className='--flex-center profile'>
      <div className='user-summary'>
        <div className='--flex-center --dir-column' key={_id}>
          <div className='profile-photo --mr2'>
            <>
              <img src={avatar} alt='Profile image' className='--mb' />

              <p className={isVerified ? 'verified' : 'no-verified'}>
                {isVerified ? 'Verified' : 'Not Verified'}
              </p>

              <p className='money --mt'>
                {amount} <strong>$</strong>
              </p>
            </>
          </div>

          <form className='--mt'>
            <div className='--flex-between '>
              <div className='--mr2'>
                <p>
                  <label>First Name:</label>
                  <input type='text' name='firstName' value={firstName} />
                </p>
                <p>
                  <label>Middle Name:</label>
                  <input type='text' name='middleName' value={middleName} />
                </p>
                <p>
                  <label>Last Name:</label>
                  <input type='text' name='lastName' value={lastName} />
                </p>
                <p></p>
              </div>
              <div className='--mb1 --ml2'>
                <p>
                  <label>Role:</label>
                  <input type='text' name='role' value={role} disabled />
                </p>
                <p>
                  <label>Email:</label>
                  <input type='email' name='email' value={email} disabled />
                </p>
                <p>
                  <label>Phone:</label>
                  <PhoneNumberInput phoneNumber={phoneNumber} />
                </p>
              </div>
            </div>
            <div className='--flex-between --my'>
              <Link to='/dashboard/users'>
                <TbArrowBackUpDouble size={25} color='#ee7483' />
                Go Back
              </Link>
              <button
                type='submit'
                className='--btn --btn-line --flex-start'
                onClick={(e) => confirmDelete(e, _id)}
              >
                Delete Profile&nbsp;
                <FaTrashAlt size={20} color='red' />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
