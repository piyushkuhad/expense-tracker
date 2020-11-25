import React from 'react';
//import { useSelector } from 'react-redux';
import SideHeader from '../../components/side-header/SideHeader.component';
import BudgetList from '../../containers/budget/budget-list/BudgetList.container';

import './BudgetHome.styles.scss';

const BudgetHome = () => {
  return (
    <>
      <SideHeader />
      <div className="cm-budget-list-container cm-main-container">
        <BudgetList />
      </div>
    </>
  );
};

export default BudgetHome;
