import PhoneNumberInput from '../../components/Input/PhoneNumberInput';
import { ImCloudUpload } from 'react-icons/im';
import { useDispatch, useSelector } from 'react-redux';
import { useLayoutEffect, useRef, useState } from 'react';

import { toast } from 'react-toastify';
import { updateUser } from '../../redux/features/auth/authSlice';
// import img from '../../assets/New folder/p.png';

const cloud_name = import.meta.env.VITE_APP_CLOUD_NAME;
const upload_preset = import.meta.env.VITE_APP_UPLOAD_PRESET;

const Information = () => {
  const { user } = useSelector((state) => state.auth);

  const initialState = {
    firstName: user?.firstName || '',
    middleName: user?.middleName,
    lastName: user?.lastName || '',
    email: user?.email || '',
    avatar: user?.avatar || '',
    role: user?.role || '',
    isVerified: user?.isVerified || false,
  };
  const [profile, setProfile] = useState(initialState);
  const { firstName, middleName, lastName, email, avatar, role } = profile;
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '');

  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const dispatch = useDispatch();
  const fileUpload = useRef();

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const showFileUpload = () => fileUpload.current.click();

  const saveProfile = async (e) => {
    e.preventDefault();
    let imageURL;
    try {
      if (!firstName || !lastName || !phoneNumber) {
        return toast.error('Please fill in all the required fields.');
      }
      if (!phoneNumber.match(/^\+?[1-9]\d{8,14}$/)) {
        console.log(phoneNumber);
        return toast.error('Please enter a valid phone number.');
      }
      if (
        profileImage !== null &&
        (profileImage.type === 'image/jpeg' ||
          profileImage.type === 'image/jpg' ||
          profileImage.type === 'image/png')
      ) {
        const image = new FormData();
        image.append('file', profileImage);
        image.append('cloud_name', cloud_name);
        image.append('upload_preset', upload_preset);

        // Save image to Cloudinary
        const response = await fetch(
          'https://api.cloudinary.com/v1_1/duftswx4f/image/upload',
          { method: 'post', body: image }
        );
        console.log(response);
        const imgData = await response.json();
        console.log(imgData);
        imageURL = imgData.url.toString();
      }
      const userData = {
        firstName: profile.firstName,
        middleName: profile.middleName,
        lastName: profile.lastName,
        email: profile.email,
        phoneNumber: phoneNumber,
        avatar: profileImage ? imageURL : profile.avatar,
        role: profile.role,
        isVerified: profile.isVerified,
      };

      await dispatch(updateUser(userData));
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  useLayoutEffect(() => {
    if (user) {
      setProfile({
        ...profile,
        firstName: user.firstName,
        middleName: user.middleName,
        lastName: user.lastName,
        email: user.email,
        // phoneNumber: user.phoneNumber,
        avatar: user.avatar,
        role: user.role,
        isVerified: user.isVerified,
      });
    }
  }, [user]);

  return (
    <>
      <div className='profile-photo'>
        <img
          // src={imagePreview === null ? user?.photo : imagePreview}
          src={imagePreview === null ? avatar : imagePreview}
          alt='Profile image'
        />
        <h3>Role: &nbsp;{role}</h3>
        <br />

        <ImCloudUpload
          size={25}
          className='btn fileUpload'
          onClick={showFileUpload}
        />
        <p className='fileUpload' onClick={showFileUpload}>
          Change Photo
        </p>
      </div>
      <form onSubmit={saveProfile}>
        <div className='--flex-between --mb'>
          <div>
            <input
              type='file'
              accept='image/*'
              name='image'
              ref={fileUpload}
              onChange={handleImageChange}
            />
            <p>
              <label>First Name:</label>
              <input
                type='text'
                name='firstName'
                value={firstName}
                onChange={handleInputChange}
              />
            </p>
            <p>
              <label>Middle Name:</label>
              <input
                type='text'
                name='middleName'
                value={middleName}
                onChange={handleInputChange}
              />
            </p>
            <p>
              <label>Last Name:</label>
              <input
                type='text'
                name='lastName'
                value={lastName}
                onChange={handleInputChange}
              />
            </p>

            <p>
              <label>Email:</label>
              <input
                type='email'
                name='email'
                value={email}
                onChange={handleInputChange}
                disabled
              />
            </p>
            <p>
              <label>Phone:</label>
              <PhoneNumberInput
                setPhoneNumber={setPhoneNumber}
                phoneNumber={phoneNumber}
              />
            </p>
          </div>
        </div>
        <button className='--btn --btn-line '>Update Profile</button>
      </form>
    </>
  );
};

export default Information;
