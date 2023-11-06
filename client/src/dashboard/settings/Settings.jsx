import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getSettings,
  updateSettings,
} from '../../redux/features/settings/settingsSlice';
import Loader from '../../components/loader/Loader';

const Settings = () => {
  const dispatch = useDispatch();
  const { settings, isLoading_S } = useSelector((state) => state.settings);

  useEffect(() => {
    dispatch(getSettings());
  }, [dispatch]);

  const [settsData, setSettsData] = useState({
    isCreate: settings?.isCreate || false,
    isAllowC: settings?.isAllowC || true,
    isAllowM: settings?.isAllowM || true,
    isDeposit: settings?.isDeposit || false,
    isWithdrawal: settings?.isWithdrawal || false,
  });
  const { isCreate, isAllowC, isAllowM, isDeposit, isWithdrawal } = settsData;
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setSettsData({ ...settsData, [name]: checked });
  };

  const updateSetting = async (e) => {
    e.preventDefault();
    const settingsData = {
      settsData,
    };
    await dispatch(updateSettings(settingsData.settsData));
  };

  const resetSetting = async (e) => {
    e.preventDefault();
    const settingsData = {
      isCreate: false,
      isAllowC: true,
      isAllowM: true,
      isDeposit: false,
      isWithdrawal: false,
    };
    await dispatch(updateSettings(settingsData));
  };

  useLayoutEffect(() => {
    if (settings) {
      setSettsData({
        isCreate: settings.isCreate,
        isAllowC: settings.isAllowC,
        isAllowM: settings.isAllowM,
        isDeposit: settings.isDeposit,
        isWithdrawal: settings.isWithdrawal,
      });
    }
  }, [settings]);
  return (
    <div className='setting-dashboard'>
      <h3 className='--ml --mt2'>Settings</h3>
      <br />
      {isLoading_S ? (
        <Loader />
      ) : (
        <form className='--flex-dir-column --ml2 '>
          <label className='settings-label' htmlFor='isCreate'>
            Stop creating a new account &nbsp;&nbsp;
          </label>
          <input
            type='checkbox'
            name='isCreate'
            id='isCreate'
            checked={isCreate}
            onChange={handleCheckboxChange}
          />
          <label className='settings-label ' htmlFor='isAllowC'>
            Allow cancellation of transactions &nbsp;&nbsp;
          </label>
          <input
            type='checkbox'
            name='isAllowC'
            id='isAllowC'
            checked={isAllowC}
            onChange={handleCheckboxChange}
          />
          <label className='settings-label ' htmlFor='isAllowM'>
            Allow transaction modification &nbsp;&nbsp;
          </label>
          <input
            type='checkbox'
            name='isAllowM'
            id='isAllowM'
            checked={isAllowM}
            onChange={handleCheckboxChange}
          />
          <label className='settings-label ' htmlFor='isDeposit'>
            Stop depositing&nbsp;&nbsp;
          </label>
          <input
            type='checkbox'
            name='isDeposit'
            id='isDeposit'
            checked={isDeposit}
            onChange={handleCheckboxChange}
          />

          <label className='settings-label' htmlFor='isWithdrawal'>
            Stop withdrawal&nbsp;&nbsp;
          </label>
          <input
            type='checkbox'
            name='isWithdrawal'
            id='isWithdrawal'
            checked={isWithdrawal}
            onChange={handleCheckboxChange}
          />
          <div className=' --width-100 --flex-end --mt2 '>
            <button
              type='submit'
              className='--btn --btn-logo '
              onClick={updateSetting}
            >
              Update Settings
            </button>
            <button
              type='submit'
              className='--btn --btn-line '
              onClick={resetSetting}
            >
              Reset Settings
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Settings;
