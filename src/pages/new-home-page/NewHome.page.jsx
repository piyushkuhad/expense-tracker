import React from 'react';

import './NewHome.styles.scss';
import SideHeader from '../../components/side-header/SideHeader.component';
import BudgetContainer from '../../containers/budget/Budget.container';

const NewHomePage = () => {
  return (
    <>
      <SideHeader />
      <div className="cm-home-page-container cm-main-container">
        <BudgetContainer />
      </div>
    </>
  );
};

export default NewHomePage;
