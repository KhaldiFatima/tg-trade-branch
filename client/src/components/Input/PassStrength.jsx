import Card from '../card/Card';
import { FaTimes } from 'react-icons/fa';
import { BsCheck2All } from 'react-icons/bs';
import styles from '../../pages/auth/auth.module.scss';
import { useState, useEffect } from 'react';

const PassStrength = ({ password }) => {
  const [uCase, setUCase] = useState(false);
  const [num, setNum] = useState(false);
  const [sChar, setSChar] = useState(false);
  const [passLength, setPassLength] = useState(false);

  const timesIcon = <FaTimes color='red' size={15} />;
  const checkIcon = <BsCheck2All color='green' size={15} />;

  const switchIcon = (condition) => {
    if (condition) {
      return checkIcon;
    }
    return timesIcon;
  };

  useEffect(() => {
    password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)
      ? setUCase(true)
      : setUCase(false);

    password.match(/([0-9])/) ? setNum(true) : setNum(false);

    password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)
      ? setSChar(true)
      : setSChar(false);

    password.length > 7 ? setPassLength(true) : setPassLength(false);
  }, [password]);

  return (
    <Card cardClass={styles.group}>
      <ul className='form-list --text-sm'>
        <li>
          <span className={styles.indicator}>
            {switchIcon(uCase)}
            &nbsp; Lowercase & Uppercase
          </span>
        </li>
        <li>
          <span className={styles.indicator}>
            {switchIcon(num)}
            &nbsp; Number (0-9)
          </span>
        </li>
        <li>
          <span className={styles.indicator}>
            {switchIcon(sChar)}
            &nbsp; Special Character (!@#$%^&*)
          </span>
        </li>
        <li>
          <span className={styles.indicator}>
            {switchIcon(passLength)}
            &nbsp; At least 8 Character
          </span>
        </li>
      </ul>
    </Card>
  );
};

export default PassStrength;
