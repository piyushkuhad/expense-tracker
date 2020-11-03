import React from 'react';

import './ColorLegend.styles.scss';

const ColorLegend = ({ legendColor, children }) => {
  return (
    <div className="cm-color-legend-container cm-flex-type-1">
      <i className="cm-color-legend" style={{ backgroundColor: legendColor }} />
      {children}
    </div>
  );
};

ColorLegend.defaultProps = {
  legendColor: '#e6e6e6',
};

export default ColorLegend;
