import NotFoundImg from '../../assets/New folder/404.webp';
import './NotFound.scss';
function NotFound() {
  return (
    <div className='--flex-center'>
      <img src={NotFoundImg} alt='Not Found Image' />
    </div>
  );
}

export default NotFound;
