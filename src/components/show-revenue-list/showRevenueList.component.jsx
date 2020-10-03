import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const ShowRevenueList = () => {
  const revenueList = useSelector((state) => state.revenue.revenueData);

  //console.log(revenueList);

  const displayList = (list) =>
    list.map((el) => {
      return (
        <li className="list-item" key={el.id}>
          Revenue:{el.revenueName}
          <br /> Amt: {el.revenueAmt} <br />
          Date: {el.revenueDate}{' '}
          {el.revenueNote !== '' ? `Notes: ${el.revenueNote}` : null}
        </li>
      );
    });

  return revenueList && revenueList.length > 0 ? (
    <ul>{displayList(revenueList)}</ul>
  ) : (
    <p>No Revenue added</p>
  );
};

export default ShowRevenueList;
