import { FaUserCircle } from 'react-icons/fa';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import Logo from '../logo/Logo';
import './Header.scss';
import { useDispatch } from 'react-redux';
import { RESET, logout } from '../../redux/features/auth/authSlice';
import { AdminLink, ShowOnLogin, ShowOnLogout } from '../helpper/hiddenLinks';
import UserName from '../userName/UserName';
import { RESET_A } from '../../redux/features/amount/amountSlice';

const activeLink = ({ isActive }) => (isActive ? 'active' : '');
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutUser = async () => {
    dispatch(RESET());
    dispatch(RESET_A());
    await dispatch(logout());
    navigate('/');
  };

  // useEffect(() => {
  //   if (isSuccess) {
  //     navigate('/');
  //   }
  //   dispatch(RESET());
  // }, [isSuccess, navigate, dispatch]);
  return (
    <header className='header'>
      <Logo color={'#fff'} />
      <nav>
        {/* <Logo /> */}

        <ul className='home-links'>
          <ShowOnLogin>
            <li className='--flex-center name'>
              <UserName />
              &nbsp;
              <FaUserCircle size={20} />
            </li>

            <li>
              <NavLink to='/profile' className={activeLink}>
                Profile
              </NavLink>
            </li>

            <AdminLink>
              <li>
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
