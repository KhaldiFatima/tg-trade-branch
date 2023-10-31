import { Spinner } from '../loader/Loader';
import { useSelector } from 'react-redux';

const ShowSpinnerOrText = ({ text, icon = '' }) => {
  const { isLoading } = useSelector((state) => state.auth);
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {text}&nbsp;
          {icon}
        </>
      )}
    </>
  );
};

export default ShowSpinnerOrText;
