import { MdOutlineAssuredWorkload } from 'react-icons/md';
import { IoMdSettings } from 'react-icons/io';
import { BiLogOutCircle } from 'react-icons/bi';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaTachometerAlt } from 'react-icons/fa';
import { PiUsersThreeDuotone } from 'react-icons/pi';
import '../../Dashboard.scss';

import { RESET, logout } from '../../../redux/features/auth/authSlice';
import { useDispatch } from 'react-redux';

const activeLink = ({ isActive }) => (isActive ? 'activeD' : '');

const PageMenuDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutUser = async () => {
    dispatch(RESET());
    await dispatch(logout());
    navigate('/');
  };
  return (
    <div className='menu-dashboard  --flex-center'>
      <ul className='list-dashboard'>
        <li id='dashboard'>
          <NavLink className={`${activeLink} --flex-start`} to='/dashboard/'>
            <FaTachometerAlt size={25} className='btn' />
            <p>&nbsp;&nbsp; Dashboard</p>
          </NavLink>
        </li>
        <li id='transaction'>
          <NavLink
            className={`${activeLink} --flex-start`}
            to='/dashboard/transactions'
          >
            <MdOutlineAssuredWorkload size={25} className='btn' />
            <p>&nbsp;&nbsp; Transactions</p>
          </NavLink>
        </li>
        <li id='users'>
          <NavLink
            className={`${activeLink} --flex-start`}
            to='/dashboard/users'
          >
            <PiUsersThreeDuotone size={25} className='btn' />
            <p>&nbsp;&nbsp; Users</p>
          </NavLink>
        </li>
        <li id='settings'>
          <NavLink
            className={`${activeLink} --flex-start`}
            to='/dashboard/settings'
          >
            <IoMdSettings size={25} className='btn' />
            <p>&nbsp;&nbsp; settings</p>
          </NavLink>
        </li>
        <li id='log out' className='--flex-start' onClick={logoutUser}>
          <BiLogOutCircle size={25} className='btn' />
          <p>&nbsp;&nbsp; Log out</p>
        </li>
      </ul>
    </div>
  );
};

export default PageMenuDashboard;
