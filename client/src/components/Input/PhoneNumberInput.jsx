import { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const PhoneNumberInput = ({ setPhoneNumber, phoneNumber = '' }) => {
  const [phoneNum, setPhoneNum] = useState(phoneNumber);
  const [valid, setValid] = useState(true);

  const handleChange = (value) => {
    setPhoneNumber(value);
    setPhoneNum(value);
    setValid(validatePhoneNumber(value));
  };

  const validatePhoneNumber = (phoneNum) => {
    const phoneNumberPattern = /^\+?[1-9]\d{8,14}$/;
    return phoneNumberPattern.test(phoneNum);
  };

  return (
    <>
      <PhoneInput
        country='dz'
        value={phoneNum}
        onChange={handleChange}
        inputProps={{
          name: 'phone',
          required: true,
        }}
        inputStyle={{
          width: 'inherit',
          display: 'block',
          fontSize: '1.6rem',
          border: '1px solid #ccc',
          borderBottom: '3px solid #ccc',
          borderRadius: '3px',
          outline: 'none',
        }}
        buttonStyle={{
          border: '1px solid #ccc',
          borderBottom: '3px solid #ccc',
          borderRadius: '3px',
          outline: 'none',
        }}
      />

      {!valid && (
        <p className='--flex-start --text-sm --color-error'>
          Please enter a valid phone number.
        </p>
      )}
    </>
  );
};

export default PhoneNumberInput;
