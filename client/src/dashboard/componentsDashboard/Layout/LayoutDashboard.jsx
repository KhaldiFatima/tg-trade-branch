import { useSelector } from 'react-redux';
import useRedirectLoggedOutUser from '../../../customHook/useRedirectLoggedOutUser';
import PageMenuDashboard from '../PageMenu/PageMenuDashboard';
import Header from '../../../components/header/Header';
import Footer from '../../../components/footer/Footer';
import Loader, { LoaderImage } from '../../../components/loader/Loader';

const LayoutDashboard = ({ children }) => {
  useRedirectLoggedOutUser('/login');

  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <Header />
      <div style={{ minHeight: '80vh' }}>
        <div className='dashboard --flex-between'>
          <PageMenuDashboard />
          {!user ? (
            <>
              <LoaderImage />
              <Loader />
            </>
          ) : (
            <div className='home-dashboard'>{children}</div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LayoutDashboard;
