import './Table.scss';
const Table = ({ title = '' }) => {
  return (
    <>
      <h3>{title}</h3>
      {/* <div className='--flex-between'> */}
      <div className='list '>
        {/* {isLoading && <Spinner />} */}
        <div className='table'>
          <table>
            <thead>
              <tr>
                <th>s/n</th>
                <th>Name</th>
                <th>Amount</th>
                <th>Type of Request</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Change</td>
                <td>70$</td>
                <td>Deposit</td>
                <td>Accept</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Table;
