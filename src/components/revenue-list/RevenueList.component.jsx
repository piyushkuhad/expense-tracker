import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { deleteRevenue } from '../../redux/revenue/revenue.action';

const RevenueList = () => {
  const revenueList = useSelector((state) => state.revenue.revenueData);
  const dispatch = useDispatch();

  //console.log(revenueList);

  const displayList = (list) =>
    list.map((el) => {
      return (
        <li className="list-item" key={el.id}>
          Revenue:{el.revenueName}
          <br /> Amt: {el.revenueAmt} <br />
          Date: {el.revenueDate}
          <br />
          {el.revenueNote !== '' ? `Notes: ${el.revenueNote}` : null}
          <br />
          {el.revenueCategory.parent
            ? `Category: ${el.revenueCategory.parent} and Sub Category: ${el.revenueCategory.label}`
            : `Category: ${el.revenueCategory.label}`}
          <Link to={`/add-revenue/${el.id}`}>Update</Link>&nbsp;
          <button onClick={() => dispatch(deleteRevenue(el.id))}>Delete</button>
        </li>
      );
    });

  return revenueList && revenueList.length > 0 ? (
    <ul>{displayList(revenueList)}</ul>
  ) : (
    <p>No Revenue added</p>
  );
};

export default RevenueList;
