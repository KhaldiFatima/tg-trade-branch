import { AiOutlineUser, AiOutlineUserDelete } from 'react-icons/ai';
import { MdPayment, MdOutlinePlace } from 'react-icons/md';

import { RiLockPasswordLine } from 'react-icons/ri';
import { BiLogOutCircle } from 'react-icons/bi';

import { NavLink } from 'react-router-dom';
import './Profile.scss';

const PageMenuProfile = () => {
  return (
    <div className='list-profile --flex-center'>
      <ul className='list-pro'>
        <li id='profile'>
          <NavLink className='--flex-start' to='/profile'>
            <AiOutlineUser size={20} className='btn' />
            <p>&nbsp;&nbsp; Profile</p>
          </NavLink>
        </li>
        <li id='address'>
          <NavLink className='--flex-start' to='/profile/address'>
            <MdOutlinePlace size={20} className='btn' />
            <p>&nbsp;&nbsp; Address</p>
          </NavLink>
        </li>
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
        <li id='log out'>
          <NavLink className='--flex-start' to='/'>
            <AiOutlineUserDelete size={20} className='btn' />
            <p>&nbsp;&nbsp; Delete account </p>
          </NavLink>
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
