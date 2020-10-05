import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ShowList from '../../components/show-list/ShowList.component';

import './Home.styles.scss';
import { deleteRevenue } from '../../redux/revenue/revenue.action';
import { deleteExpense } from '../../redux/expense/expense.action';
import Header from '../../components/header/Header.component';
import { formatDate } from '../../utils/dateMethods';
import { filteredDateList } from '../../utils/listOp';

const Home = (props) => {
  const revenueList = useSelector((state) => state.revenue.revenueData);
  const expenseList = useSelector((state) => state.expense.expenseData);
  const dateSelected = useSelector((state) => state.dateFilter);

  const renderedRevenue = filteredDateList(
    revenueList,
    dateSelected.startDate,
    dateSelected.endDate
  );
  const renderedExpense = filteredDateList(
    expenseList,
    dateSelected.startDate,
    dateSelected.endDate
  );

  return (
    <>
      <Header />
      <div className="cm-homepage-container cm-page-container">
        <Link to="/add-revenue/">Add Revenue</Link>
        <Link to="/add-expense/">Add Expense</Link>
        <div className="cm-date-selected">
          <p>
            Filter b/w &nbsp;
            <strong>
              {formatDate(dateSelected.startDate)} -{' '}
              {formatDate(dateSelected.endDate)}
            </strong>
          </p>
        </div>
        <div className="cm-total">
          <h2>Total Revenue: {renderedRevenue.total}</h2>
          <h2>Total Expense: {renderedExpense.total}</h2>
          <h2>
            Total Savings: {renderedRevenue.total - renderedExpense.total}
          </h2>
        </div>
        <div className="cm-list-wrapper">
          <div className="row-fluid">
            <div className="cm-col">
              <ShowList
                list={renderedRevenue.data}
                deleteFn={deleteRevenue}
                emptyMsg="No Revenue added"
              />
            </div>
            <div className="cm-col">
              <ShowList
                list={renderedExpense.data}
                deleteFn={deleteExpense}
                emptyMsg="No Expense added"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
