import * as React from 'react';
import { GoogleLogout } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import logoImage from '../../assets/colonial-electric-logo.png';
import './Header.scss';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const GOOGLE_CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

  const logoutHandler = () => {
    localStorage.removeItem('tokenId');
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  return (
    <header className="header">
      <img src={logoImage} className="header__logo" alt="logo" />

      <GoogleLogout
        clientId={GOOGLE_CLIENT_ID}
        buttonText="Logout"
        onLogoutSuccess={logoutHandler}
        cookiePolicy="single_host_origin"
        render={renderProps => (
          <button
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            className="header__login-btn"
            type="button"
          >
            Logout
          </button>
        )}
      />
    </header>
  );
};

export default Header;
