import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/features/auth/authSlice';

export const shortenText = (text, n) => {
  if (text.length > n) {
    const shortenedText = text.substring(0, n).concat('...');
    return shortenedText;
  }
  return text;
};

const UserName = () => {
  const user = useSelector(selectUser);

  const username = user?.firstName || '...';

  return <p className='--color-white name'>Hi, {shortenText(username, 9)} |</p>;
};

export default UserName;
