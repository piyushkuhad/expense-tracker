import React from 'react';
import Lottie from 'react-lottie';

const Animation = ({ animationData, width, height }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <Lottie
      options={defaultOptions}
      height={height}
      width={width}
      className="cm-animation-container"
    />
  );
};

Animation.defaultProps = {
  width: '100%',
  height: '100%',
};

export default Animation;
