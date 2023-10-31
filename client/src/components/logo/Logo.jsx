import { useNavigate } from 'react-router-dom';
import { SiProgress } from 'react-icons/si';

function Logo({ color = '#030b6b' }) {
  const navigate = useNavigate();
  const goHome = () => {
    navigate('/');
  };
  return (
    <div className='logo' style={{ color: `${color}` }} onClick={goHome}>
      <span style={{ fontFamily: 'Pacifico, cursive' }}>
        <strong> TG </strong>trade
      </span>
      &nbsp;
      <SiProgress size={35} color='orangered' />
    </div>
  );
}

export default Logo;
