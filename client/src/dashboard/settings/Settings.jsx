const Settings = () => {
  return (
    <div className='setting-dashboard'>
      <h3 className='--ml --mt2'>Settings</h3>
      <br />
      <form className='--flex-dir-column --ml2 '>
        <label className='settings-label' htmlFor='isCreate'>
          Stop creating a new account &nbsp;&nbsp;
        </label>
        <input
          type='checkbox'
          name='isCreate'
          id='isCreate'
          // checked={isCreate}
        />
        <label className='settings-label ' htmlFor='isAllow'>
          Allow withdrawal cancellation &nbsp;&nbsp;
        </label>
        <input
          type='checkbox'
          name='isAllow'
          id='isAllow'
          // checked={isAllow}
          // onChange={handleCheckboxChange}
        />
        <label className='settings-label ' htmlFor='isDeposit'>
          Stop depositing&nbsp;&nbsp;
        </label>
        <input
          type='checkbox'
          name='isDeposit'
          id='isDeposit'
          // checked={isDeposit}
          // onChange={handleCheckboxChange}
        />

        <label className='settings-label' htmlFor='isWithdrawal'>
          Stop withdrawal&nbsp;&nbsp;
        </label>
        <input
          type='checkbox'
          name='isWithdrawal'
          id='isWithdrawal'
          // checked={isWithdrawal}
          // onChange={handleCheckboxChange}
        />
        <div className=' --width-00 --flex-end --mt2 '>
          <button type='submit' className='--btn --btn-logo '>
            Update Settings
          </button>
          <button
            type='submit'
            className='--btn --btn-line '
            // onClick={resetSetting}
          >
            {/* <ShowSpinnerOrText text={'Reset Settings'} /> */}
            Reset Settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
