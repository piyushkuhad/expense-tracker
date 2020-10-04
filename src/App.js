import React from 'react';
import { Router, Route } from 'react-router-dom';

import './App.css';
import history from './history';
import AddExpense from './pages/add-expense/AddExpense.component';
import AddRevenue from './pages/add-revenue/AddRevenue.page';
import Home from './pages/home-page/Home.page';

const App = () => {
  return (
    <div className="App">
      <Router history={history}>
        <Route exact path="/" component={Home} />
        <Route exact path="/add-revenue/:id?" component={AddRevenue} />
        <Route exact path="/add-expense/:id?" component={AddExpense} />
      </Router>
    </div>
  );
};

export default App;
