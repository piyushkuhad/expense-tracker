import React from 'react';

import './NewHome.styles.scss';
import SideHeader from '../../components/side-header/SideHeader.component';
import BudgetContainer from '../../containers/budget/Budget.container';
import AppBarMenu from '../../components/app-bar-menu/AppBarMenu.component';

const NewHomePage = (props) => {
  return (
    <>
      {window.innerWidth > 768 ? <SideHeader /> : <AppBarMenu />}
      <div className="cm-home-page-container cm-main-container">
        <BudgetContainer selectBudget={props.location.search} />
      </div>
    </>
  );
};

export default NewHomePage;
