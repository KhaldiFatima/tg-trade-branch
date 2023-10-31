import { useState } from 'react';
import Search from '../componentsDashboard/search/Search';

const HeaderInfo = ({ title }) => {
  const [search, setSearch] = useState('');
  return (
    <div className='--flex-between'>
      <span>
        <h3>{title}</h3>
      </span>
      <span>
        <Search value={search} onChange={(e) => setSearch(e.target.value)} />
      </span>
    </div>
  );
};

export default HeaderInfo;
