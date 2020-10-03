import React from 'react';
import { Link } from 'react-router-dom';
import RevenueList from '../../components/revenue-list/RevenueList.component';

const Home = (props) => {
  return (
    <div className="cm-homepage-container cm-page-container">
      <Link to="/add-revenue/">Add Revenue</Link>
      <RevenueList />
    </div>
  );
};

export default Home;
