import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import './Input.scss';

const PasswordInput = ({ name, value, placeholder, onChange, onPaste }) => {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className='password'>
      <input
        type={showPassword ? 'text' : 'Password'}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        onPaste={onPaste}
        // required
      />
      <div className='icon' onClick={toggleShowPassword}>
        {showPassword ? (
          <AiOutlineEyeInvisible size={20} color='#ee7483' />
        ) : (
          <AiOutlineEye size={20} color='rgb(24 89 154)' />
        )}
      </div>
    </div>
  );
};

export default PasswordInput;
