const Footer = () => {
  return (
    <footer>
      <hr className='--color-dark' />
      <div className='--flex-center --py1-5 --bg-grey'>
        <p>
          All Rights Reserved <strong>TG Academy</strong> &copy;
          {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
