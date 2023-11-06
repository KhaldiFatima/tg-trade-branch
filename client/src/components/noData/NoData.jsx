import noData from '../../assets/New folder/noData.png';

const NoData = () => {
  return (
    <div className='--center-all '>
      <img src={noData} alt='No transaction found...' />
      <p>No transaction found ... </p>
    </div>
  );
};

export default NoData;
