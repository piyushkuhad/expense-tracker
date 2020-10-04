import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ShowList from '../../components/show-list/ShowList.component';

import { deleteRevenue } from '../../redux/revenue/revenue.action';
import { deleteExpense } from '../../redux/expense/expense.action';
import Header from '../../components/header/Header.component';
import { formatDate, filteredDateList } from '../../utils/dateMethods';

const Home = (props) => {
  const revenueList = useSelector((state) => state.revenue.revenueData);
  const expenseList = useSelector((state) => state.expense.expenseData);
  const dateSelected = useSelector((state) => state.dateFilter);

  // console.log(
  //   'Result',
  //   // checkDateBetween(
  //   //   '2020-10-28T18:29:59.999Z',
  //   //   '2020-09-30T18:30:00.000Z',
  //   //   '2020-10-31T18:29:59.999Z'
  //   // )
  //   filteredDateList(revenueList, dateSelected.startDate, dateSelected.endDate)
  // );

  let renderedRevenue = filteredDateList(
    revenueList,
    dateSelected.startDate,
    dateSelected.endDate
  );
  let renderedExpense = filteredDateList(
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
        <ShowList
          list={renderedRevenue}
          deleteFn={deleteRevenue}
          emptyMsg="No Revenue added"
        />
        <ShowList
          list={renderedExpense}
          deleteFn={deleteExpense}
          emptyMsg="No Expense added"
        />
      </div>
    </>
  );
};

export default Home;
