import { FaTrashAlt } from 'react-icons/fa';
import PhoneNumberInput from '../../components/Input/PhoneNumberInput';
import ShowSpinnerOrText from '../../components/helpper/ShowSpinnerOrText';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getUsers } from '../../redux/features/auth/authSlice';
import { TbArrowBackUpDouble } from 'react-icons/tb';
// import img from '../../assets/New folder/p.png';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Link, useParams } from 'react-router-dom';

import { useEffect } from 'react';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const ID = useParams();

  // useEffect(() => {
  //   dispatch(getUserWithId(ID));
  // }, [dispatch, ID]);
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const profile = {
    id: user?._id || '',
    firstName: user?.firstName || '',
    middleName: user?.middleName,
    lastName: user?.lastName || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    avatar: user?.avatar || '',
    role: user?.role || '',
    isVerified: user?.isVerified || false,
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
  } = profile;

  const delUser = async (id) => {
    await dispatch(deleteUser(id));
  };

  const confirmDelete = (id) => {
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
          <div className='profile-photo'>
            <div>
              <img src={avatar} alt='Profile image' />

              {/* <p className={isVerified ? 'verified' : 'no-verified'}>
                {isVerified ? 'Verified' : 'Not Verified'}
              </p> */}
            </div>
          </div>
          {/* onSubmit={delUser(id)} */}
          <form>
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
            <div className='--flex-between --my2'>
              <Link to='/dashboard/users'>
                <TbArrowBackUpDouble size={25} color='#ee7483' />
                Go Back
              </Link>
              <button
                type='submit'
                className='--btn --btn-line --flex-start'
                onClick={() => confirmDelete(_id)}
              >
                <ShowSpinnerOrText
                  text={'Delete Profile'}
                  icon={<FaTrashAlt size={20} color='red' />}
                />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
