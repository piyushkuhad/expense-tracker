import React from 'react';
import Animation from '../../components/animation/Animation.component';

import './Loader.styles.scss';
import animationData1 from '../../assets/animations/loader2.json';
import animationData2 from '../../assets/animations/main-loader.json';

const Loader = ({ loadingText, loaderType }) => {
  const loaderSetting = {
    animationData: loaderType === 'default' ? animationData2 : animationData1,
    animationWidth: loaderType === 'default' ? '80%' : '80%',
    animationHeight: loaderType === 'default' ? '80%' : '30%',
  };

  return (
    <div
      className={`cm-loader-container cm-flex-type-2 ${
        loaderType === 'login' ? 'cm-login-loader' : 'cm-default-loader'
      }`}
    >
      <div className="cm-loader-inner">
        <Animation
          animationData={loaderSetting.animationData}
          width={loaderSetting.animationWidth}
          height={loaderSetting.animationHeight}
        />
        <h2>{loadingText}</h2>
      </div>
    </div>
  );
};

Loader.defaultProps = {
  loadingText: 'Loading',
  loaderType: 'default',
};

export default Loader;
