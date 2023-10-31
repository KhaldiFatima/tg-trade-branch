import { useState } from 'react';
import './Dropdown.scss';

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='dropdown'>
      <button className='dropdown-trigger' onClick={toggleDropdown}>
        Toggle Dropdown
      </button>
      {isOpen && (
        <ul className='dropdown-menu'>
          <li>Option 1</li>
          <li>Option 2</li>
          <li>Option 3</li>
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
