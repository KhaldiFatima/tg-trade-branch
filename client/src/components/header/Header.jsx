import { FaUserCircle } from 'react-icons/fa';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import Logo from '../logo/Logo';
import './Header.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RESET, logout } from '../../redux/features/auth/authSlice';
import { AdminLink, ShowOnLogin, ShowOnLogout } from '../helpper/hiddenLinks';
import UserName from '../userName/UserName';
import { RESET_A } from '../../redux/features/amount/amountSlice';
import { useState } from 'react';
// import Cookies from 'js-cookie';

const activeLink = ({ isActive }) => (isActive ? 'active' : '');
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const init = Cookies.get('isShowHome');
  // console.log(init);
  const [isShowHome, setIsShowHome] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const logoutUser = async () => {
    dispatch(RESET());
    dispatch(RESET_A());
    await dispatch(logout());
    navigate('/');
  };

  // useEffect(() => {
  //   Cookies.set('isShowHome', isShowHome);
  // }, [isShowHome]);

  return (
    <header className='header'>
      <Logo color={'#fff'} />
      <nav>
        {/* <Logo /> */}

        <ul className='home-links'>
          <ShowOnLogin>
            <li className='--flex-center name'>
              <UserName />
              &nbsp;{' '}
            </li>
            {/* <FaUserCircle size={20} /> */}

            {isShowHome === true ? (
              <li
                onClick={() => {
                  setIsShowHome(false);
                }}
              >
                <NavLink to='/Home' className={activeLink}>
                  Home
                </NavLink>
              </li>
            ) : (
              <li>
                <NavLink to='/profile' className={activeLink}>
                  Profile
                </NavLink>
              </li>
            )}
            <li>
              <div
                className='avatar'
                onClick={() => {
                  navigate('/profile');
                }}
              >
                <img src={user?.avatar} alt='Profile image' />
              </div>
            </li>
            <AdminLink>
              <li
                onClick={() => {
                  setIsShowHome(true);
                }}
              >
                <button className='--btn --btn-secondary'>
                  <NavLink to='/dashboard' className={activeLink}>
                    Dashboard
                  </NavLink>
                </button>
              </li>
            </AdminLink>
            <li>
              <button className='--btn --btn-secondary' onClick={logoutUser}>
                Logout
              </button>
            </li>
          </ShowOnLogin>
          <ShowOnLogout>
            <li>
              <button className='--btn --btn-secondary'>
                <Link to='/login'>Login</Link>
              </button>
            </li>
          </ShowOnLogout>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
