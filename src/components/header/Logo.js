// import PropTypes from "prop-types";
// import clsx from "clsx";
// import { Link } from "react-router-dom";

// const Logo = ({ imageUrl, logoClass }) => {
//   return (
//     <div className={clsx(logoClass)}>
//       <Link to={process.env.PUBLIC_URL + "/"}>
//         <img alt="" src={process.env.PUBLIC_URL + imageUrl} />
//       </Link>
//     </div>
//   );
// };

// Logo.propTypes = {
//   imageUrl: PropTypes.string,
//   logoClass: PropTypes.string
// };

// export default Logo;

import PropTypes from 'prop-types';

const Logo = ({ imageUrl, className }) => {
  return (
    <div className="logo" style={{ margin: 0, display: 'flex', alignItems: 'center', lineHeight: 0 }}>
      <a href="/" style={{ display: 'flex', alignItems: 'center' }}>
        <img 
          src={imageUrl} 
          alt="Logo"
          className={className} 
          style={{
            maxHeight: '48px',
            maxWidth: '100%',
            width: 'auto',
            height: 'auto',
            objectFit: 'contain',
            display: 'block'
          }}
        />
      </a>
    </div>
  );
};

Logo.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default Logo;