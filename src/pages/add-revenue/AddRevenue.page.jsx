import React from 'react';
import AddRevenueForm from '../../components/forms/AddRevenueForm.component';

import './AddRevenue.styles.scss';

const AddRevenue = (props) => {
  return (
    <div className="cm-page-container">
      <AddRevenueForm {...props} />
    </div>
  );
};

export default AddRevenue;
