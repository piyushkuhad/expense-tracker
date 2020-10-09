import React from 'react';
import { Router, Route } from 'react-router-dom';

import './App.scss';
import history from './history';
import BudgetHome from './pages/budget-home-page/BudgetHome.page';
import CreateBudgetPage from './pages/create-budget/CreateBudget.page';
import NewHomePage from './pages/new-home-page/NewHome.page';

const App = () => {
  return (
    <div className="App">
      <Router history={history}>
        <Route exact path="/" component={NewHomePage} />
        <Route exact path="/create-budget" component={CreateBudgetPage} />
        <Route exact path="/budget" component={BudgetHome} />
      </Router>
    </div>
  );
};

export default App;
