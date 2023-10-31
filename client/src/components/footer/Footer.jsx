const Footer = () => {
  return (
    <>
      <hr className='--color-dark' />
      <div className='--flex-center --py2 --bg-grey'>
        <p>
          All Rights Reserved <strong>TG Academy</strong> &copy;
          {new Date().getFullYear()}
        </p>
      </div>
    </>
  );
};

export default Footer;
