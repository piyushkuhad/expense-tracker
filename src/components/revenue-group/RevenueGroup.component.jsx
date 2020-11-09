import React from 'react';
import moment from 'moment';
import Avatar from '@material-ui/core/Avatar';
import { useSelector } from 'react-redux';

import './RevenueGroup.styles.scss';
import { currencyFormat } from '../../utils/utilFn';
import income from '../../assets/images/income.svg';

const RevenueGroup = ({ date, categoryArr }) => {
  const currency = useSelector((state) => state.user.currency.symbol);

  return (
    <div className="cm-revenue-group-container">
      <div className="cm-revenue-date cm-flex-type-1">
        <p>{moment(date).format('dddd, Do MMMM YYYY')}</p>
      </div>
      <div className="cm-revenue-list">
        {categoryArr.map((el) => (
          <div className="cm-revenue-item cm-flex-type-1">
            <Avatar alt="Revenue" src={income} />
            <div className="cm-revenue-item-content cm-flex-type-1">
              <h4>{el.categoryName}</h4>
              <h4>
                {currency} {currencyFormat(el.categoryAmount)}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RevenueGroup;
