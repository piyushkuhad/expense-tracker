import React from 'react';
import AddRevenueForm from '../../components/forms/AddRevenueForm.component';
import ShowRevenueList from '../../components/show-revenue-list/showRevenueList.component';

import './AddRevenue.styles.scss';

const AddRevenue = () => (
  <div className="cm-page-container">
    <AddRevenueForm />
    <ShowRevenueList />
  </div>
);

export default AddRevenue;
