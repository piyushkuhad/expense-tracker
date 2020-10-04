import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/dateMethods';

const ShowList = ({ list, deleteFn, emptyMsg }) => {
  const dispatch = useDispatch();

  //console.log(revenueList);

  const displayList = (list) =>
    list.map((el) => {
      const updateLink =
        el.type === 'revenue' ? '/add-revenue' : '/add-expense';

      return (
        <li className="list-item" key={el.id}>
          <span>
            <strong>{el.type.toUpperCase()}</strong>
          </span>
          <br />
          Revenue:{el.name}
          <br /> Amt: {el.amount} <br />
          Date: {formatDate(el.date)}
          <br />
          {el.note !== '' ? `Notes: ${el.note}` : null}
          <br />
          {el.category.parent
            ? `Category: ${el.category.parent} and Sub Category: ${el.category.label}`
            : `Category: ${el.category.label}`}
          <Link to={`${updateLink}/${el.id}`}>Update</Link>&nbsp;
          <button onClick={() => dispatch(deleteFn(el.id))}>Delete</button>
        </li>
      );
    });

  return list && list.length > 0 ? (
    <ul>{displayList(list)}</ul>
  ) : (
    <p>{emptyMsg}</p>
  );
};

ShowList.defaultProps = {
  emptyMsg: 'Nothing to Show',
};

export default ShowList;
