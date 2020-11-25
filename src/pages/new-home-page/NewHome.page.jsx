import React from 'react';

import './NewHome.styles.scss';
import SideHeader from '../../components/side-header/SideHeader.component';
import BudgetContainer from '../../containers/budget/Budget.container';

const NewHomePage = (props) => {
  return (
    <>
      <SideHeader />
      <div className="cm-home-page-container cm-main-container">
        <BudgetContainer selectBudget={props.location.search} />
      </div>
    </>
  );
};

export default NewHomePage;
