import PageMenuProfile from '../../pages/profile/PageMenuProfile';

import './Layout.scss';
import LayoutHome from './LayoutHome';

function LayoutProfile({ children }) {
  return (
    <LayoutHome>
      <div className='--flex-around'>
        <PageMenuProfile />
        <div className='--flex-center profile'>
          <div className='card --flex-center'>{children}</div>
        </div>
      </div>
    </LayoutHome>
  );
}

export default LayoutProfile;
