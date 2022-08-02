import React from 'react';
import { useDispatch } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router-dom';

import Card from '../../components/Card/Card';
import logoImage from '../../assets/colonial-electric-logo.png';
import googleIcon from '../../assets/google-logo.png';
import './Login.scss';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const GOOGLE_CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

  const loginHandler = response => {
    if (response.tokenId) {
      localStorage.setItem('tokenId', response.tokenId);
      dispatch({ type: 'LOGIN' });
      navigate('/');
    }
  };

  return (
    <div className="login">
      <Card size="NARROW" style={{ padding: '1.6rem 1.2rem' }}>
        <div className="login__content">
          <div className="login__logo">
            <img src={logoImage} alt="logo" className="login__logo-img" />
          </div>
          <div className="login__welcome-text">
            <span className="login__text-top">Welcome to</span>
            <span className="login__text-bottom">Cost Estimation Calculator</span>
          </div>
          <div className="login__btn-box">
            <GoogleLogin
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Login"
              onSuccess={loginHandler}
              onFailure={loginHandler}
              cookiePolicy="single_host_origin"
              render={renderProps => (
                <button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  className="login__btn"
                  type="button"
                >
                  <img src={googleIcon} className="login__btn-icon" alt="google icon" />
                  <span className="login__btn-text">Log in with Google</span>
                </button>
              )}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Login;
