import { AiOutlineUser, AiOutlineUserDelete } from 'react-icons/ai';
import { MdPayment, MdOutlinePlace } from 'react-icons/md';

import { RiLockPasswordLine } from 'react-icons/ri';
import { BiLogOutCircle } from 'react-icons/bi';

import { NavLink, useNavigate } from 'react-router-dom';
import './Profile.scss';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, logout } from '../../redux/features/auth/authSlice';
import { confirmAlert } from 'react-confirm-alert';
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser';
import { deleteTransactionsUser } from '../../redux/features/transaction/transactionSlice';
import { FaTachometerAlt } from 'react-icons/fa';
import { AdminLink } from '../../components/helpper/hiddenLinks';

const PageMenuProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useRedirectLoggedOutUser('/');
  const delUser = async (id) => {
    await dispatch(deleteUser(id));
    await dispatch(deleteTransactionsUser(id));
    dispatch(logout());
    navigate('/');
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: 'Delete Account',
      message: 'Are you sure to do delete your account?',
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
    <div className='list-profile --flex-center'>
      <ul className='list-pro'>
        <li id='profile'>
          <NavLink className='--flex-start' to='/profile/'>
            <AiOutlineUser size={20} className='btn' />
            <p>&nbsp;&nbsp; Profile</p>
          </NavLink>
        </li>
        <AdminLink>
          <li id='dashboard'>
            <NavLink className='--flex-start' to='/dashboard/'>
              <FaTachometerAlt size={25} className='btn' />
              <p>&nbsp;&nbsp; Dashboard</p>
            </NavLink>
          </li>
        </AdminLink>

        <li id='change password'>
          <NavLink className='--flex-start' to='/profile/change-password'>
            <RiLockPasswordLine size={20} className='btn' />
            <p>&nbsp;&nbsp; Change password</p>
          </NavLink>
        </li>
        <li id='payment'>
          <NavLink className='--flex-start' to='/profile/payment-method'>
            <MdPayment size={20} className='btn' />
            <p>&nbsp;&nbsp; Payment Methods</p>
          </NavLink>
        </li>
        <li
          id='log out'
          className='--flex-start'
          onClick={() => confirmDelete(user._id)}
        >
          <AiOutlineUserDelete size={20} className='btn' />
          <p>&nbsp;&nbsp; Delete account </p>
        </li>
        <li id='log out'>
          <NavLink className='--flex-start' to='/login'>
            <BiLogOutCircle size={20} className='btn' />
            <p>&nbsp;&nbsp; Log out</p>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default PageMenuProfile;
