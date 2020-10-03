import React from 'react';

import { BrowserRouter, Route } from 'react-router-dom';

import './App.css';
import AddRevenue from './pages/add-revenue/AddRevenue.page';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/" component={AddRevenue} />
      </BrowserRouter>
    </div>
  );
};

export default App;
