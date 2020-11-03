import React from 'react';
import Animation from '../../components/animation/Animation.component';

import './Loader.styles.scss';
import animationData from '../../assets/animations/loader2.json';

const Loader = ({ loadingText }) => {
  return (
    <div className="cm-loader-container cm-flex-type-2">
      <div className="cm-loader-inner">
        <Animation animationData={animationData} width="80%" height="250px" />
        <h2>{loadingText}</h2>
      </div>
    </div>
  );
};

Loader.defaultProps = {
  loadingText: 'Loading...',
};

export default Loader;
