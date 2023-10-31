import { NavLink } from 'react-router-dom';
import './PageMenu.scss';

const PageMenu = () => {
  return (
    <>
      <nav className='--btn-logo --p --mb'>
        <ul className='home-links'>
          <li>
            <NavLink to='/home' className='link'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/deposit'>Deposit</NavLink>
          </li>

          <li>
            <NavLink to='/withdrawal'>Withdrawal</NavLink>
          </li>

          <li>
            <NavLink to='/transaction'>Transaction</NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default PageMenu;
