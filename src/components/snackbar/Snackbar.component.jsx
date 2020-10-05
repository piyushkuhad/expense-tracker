import React from 'react';
import {
  IoMdInformationCircle,
  IoMdCheckmarkCircle,
  IoMdCloseCircle,
} from 'react-icons/io';

import './Snackbar.styles.scss';

const Snackbar = ({ type, message }) => {
  const iconOptions = {
    fontSize: 24,
    className: 'cm-icon',
  };

  const snackIconSelector = (type) => {
    let snackIcon = <IoMdInformationCircle {...iconOptions} />;

    if (type === 'success') {
      snackIcon = <IoMdCheckmarkCircle {...iconOptions} />;
    }
    if (type === 'error') {
      snackIcon = <IoMdCloseCircle {...iconOptions} />;
    }

    return snackIcon;
  };

  return (
    <div className={`cm-snackbar-container ${type}`}>
      <div className="cm-snackicon">{snackIconSelector(type)}</div>
      <div className="cm-snack-msg">{message}</div>
    </div>
  );
};

Snackbar.defaultProps = {
  type: 'info',
  message: 'Info',
};

export default Snackbar;
