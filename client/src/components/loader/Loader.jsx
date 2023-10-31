import './Loader.scss';
import ReactDOM from 'react-dom';
import loaderImg from '../../assets/New folder/loaderdot.gif';
import loaderImg1 from '../../assets/New folder/loading.gif';
import loaderImg2 from '../../assets/New folder/loding.webp';

const Loader = () => {
  return ReactDOM.createPortal(
    <div className='wrapper'>
      <div className='loader'>
        <img src={loaderImg} alt='Loading...' width={300} />
      </div>
    </div>,
    document.getElementById('loader')
  );
};

export const Spinner = () => {
  return (
    <div className='--center-all spinner'>
      <img src={loaderImg1} alt='Loading...' />
    </div>
  );
};

export const LoaderImage = () => {
  return (
    <div className='--center-all '>
      <img src={loaderImg2} alt='Loading...' />
    </div>
  );
};

export default Loader;
