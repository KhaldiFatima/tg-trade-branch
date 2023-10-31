import { Link } from 'react-router-dom';
import WelcomeImg from '../../assets/New folder/welcomeImg.png';
import Logo from '../../components/logo/Logo';
import './WelcomePage.jsx.scss';
import {
  ShowOnLogin,
  ShowOnLogout,
} from '../../components/helpper/hiddenLinks';
import { IsStopCreateAccount } from '../../components/helpper/settingsFunction';

function WelcomePage() {
  return (
    <>
      <section className='container hero  '>
        <div className='hero-text '>
          <h2 className='--flex-start'>
            Welcome to &nbsp;
            <Logo />
          </h2>
          <p>
            The <strong>TG trade</strong> platform is suitable for people who
            want to trade or invest their money.
          </p>

          <p>
            The
            <strong>
              {
                <a
                  href='https://www.tg-academy.com/'
                  rel='noreferrer'
                  target='_blank'
                >
                  TG Academy
                </a>
              }
            </strong>
            realizes the importance of platforms and their necessity in online
            trading, and for this reason it offers you this wonderful platform
            for trading and one of the most prominent works of the Academy.
          </p>
          <ShowOnLogin>
            <button className='--btn --btn-line'>
              <Link to='/home'> GO to Home</Link>
            </button>
          </ShowOnLogin>
          <ShowOnLogout>
            <div className='hero-buttons --flex-start'>
              <IsStopCreateAccount>
                <button className='--btn --btn-danger'>
                  <Link to='/register'>Register</Link>
                </button>
              </IsStopCreateAccount>
              <button className='--btn --btn-primary'>
                <Link to='/login'>Login</Link>
              </button>
            </div>
          </ShowOnLogout>
        </div>
        <div className='hero-image'>
          <img src={WelcomeImg} alt='Auth' />
        </div>
      </section>
    </>
  );
}

export default WelcomePage;
