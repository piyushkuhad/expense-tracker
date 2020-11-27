import React from 'react';
import AppBarMenu from '../../components/app-bar-menu/AppBarMenu.component';
//import { useSelector } from 'react-redux';
import SideHeader from '../../components/side-header/SideHeader.component';
import BudgetList from '../../containers/budget/budget-list/BudgetList.container';

import './BudgetHome.styles.scss';

const BudgetHome = () => {
  return (
    <>
      {window.innerWidth > 768 ? <SideHeader /> : <AppBarMenu />}
      <div className="cm-budget-list-container cm-main-container">
        <BudgetList />
      </div>
    </>
  );
};

export default BudgetHome;
