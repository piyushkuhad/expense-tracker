import React, { useState } from 'react';
import Animation from '../../components/animation/Animation.component';
import ButtonWrapper from '../../components/button/ButtonWrapper.component';
import Login from '../../components/forms/Login.component';

import './Authentication.styles.scss';
import animationData from '../../assets/animations/login.json';
import Header from '../../components/header/Header.component';

const Authentication = () => {
  const [authType, setAuthType] = useState('login');

  const changeAuthType = (authName) => {
    setAuthType(authName);
  };

  return (
    <>
      <Header logoType="white" />
      <div className="cm-main-container cm-authentication-container">
        <div className="cm-page-center">
          <div className="cm-full-bg">
            <Animation animationData={animationData} width="80%" height="80%" />
          </div>
          <div className={`cm-form-wrapper ${authType}`}>
            {authType === 'login' ? (
              <div className="cm-login-wrapper">
                <h1>Welcome Back!</h1>
                <h2>Login</h2>
                <Login />
                <ButtonWrapper
                  variant="contained"
                  color="primary"
                  onClick={() => changeAuthType('sign-up')}
                  className="cm-fw-btn"
                  size="large"
                >
                  Sign Up
                </ButtonWrapper>
              </div>
            ) : (
              <div className="cm-signup-wrapper">
                <h1>Welcome!</h1>
                <h2>Sign Up</h2>
                <Login />
                <ButtonWrapper
                  variant="contained"
                  color="primary"
                  onClick={() => changeAuthType('login')}
                  className="cm-fw-btn"
                  size="large"
                >
                  Login
                </ButtonWrapper>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Authentication;
