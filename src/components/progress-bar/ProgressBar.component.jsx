import React from 'react';

import './ProgressBar.styles.scss';

const ProgressBar = ({ progressValue, showValue, barColor }) => {
  const calcProgressValue = progressValue > 100 ? 100 : progressValue;
  let finalBarColor;
  if (progressValue >= 100) {
    finalBarColor = '#f44336';
  } else if (90 < progressValue < 100) {
    finalBarColor = '#E64A19';
  } else {
    finalBarColor = barColor;
  }

  return (
    <div
      className={`cm-progress-bar-container ${
        showValue ? 'cm-show-value cm-flex-type-2' : null
      }`}
    >
      <div
        className="cm-progress-bar"
        style={{
          backgroundColor: finalBarColor,
          width: `${calcProgressValue}%`,
        }}
      ></div>
      {showValue ? <span>{calcProgressValue + '%'}</span> : null}
    </div>
  );
};

ProgressBar.defaultProps = {
  progressValue: 0,
  showValue: false,
  barColor: '#4caf50',
};

export default ProgressBar;
