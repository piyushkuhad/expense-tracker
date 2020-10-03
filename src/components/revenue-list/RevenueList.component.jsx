import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const RevenueList = () => {
  const revenueList = useSelector((state) => state.revenue.revenueData);

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
          <Link to={`/add-revenue/${el.id}`}>Update</Link>
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
