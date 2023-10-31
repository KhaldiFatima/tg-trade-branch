import { useSelector } from 'react-redux';
import PageMenu from '../pageMenu/PageMenu';
import Layout from './Layout';
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser';
import Notification from '../notification/Notification';
import Loader, { LoaderImage } from '../loader/Loader';

function LayoutHome({ children }) {
  useRedirectLoggedOutUser('/login');

  const { user, isLoading } = useSelector((state) => state.auth);
  return (
    <Layout>
      <section>
        <PageMenu />
        {!user ? (
          <>
            <LoaderImage />
            <Loader />
          </>
        ) : (
          <>
            {!user?.isVerified ? <Notification /> : null}
            <br />
            <div className='container'>{children}</div>
          </>
        )}
      </section>
    </Layout>
  );
}

export default LayoutHome;
