import React from 'react';
import moment from 'moment';
import Avatar from '@material-ui/core/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

import './RevenueGroup.styles.scss';
import { currencyFormat } from '../../utils/utilFn';
import income from '../../assets/images/income.svg';
import {
  updateIncomeCategoryDialog,
  deleteIncomeCategoryDialog,
} from '../../redux/dialog-forms/dialog-form.actions';
import DeleteMenu from '../delete-menu/DeleteMenu.component';

const RevenueGroup = ({ date, categoryArr }) => {
  const dispatch = useDispatch();
  const currency = useSelector((state) => state.user.currency.symbol);

  const openForm = (incomeCategoryData) => {
    dispatch(
      updateIncomeCategoryDialog({
        data: { ...incomeCategoryData, categoryId: incomeCategoryData._id },
        formDialogName: 'incomeFormDialog',
      })
    );
  };

  const deleteFn = (incomeCategoryData) => {
    dispatch(
      deleteIncomeCategoryDialog({
        data: {
          _id: incomeCategoryData._id,
          name: incomeCategoryData.categoryName,
          categoryId: incomeCategoryData._id,
          type: 'revenue',
        },
        formDialogName: 'deleteFormDialog',
      })
    );
  };

  const isPhone = window.innerWidth < 480;

  return (
    <div className="cm-revenue-group-container">
      <div className="cm-revenue-date cm-flex-type-1">
        <p>{moment(date).format('dddd, Do MMMM YYYY')}</p>
      </div>
      <div className="cm-revenue-list">
        {categoryArr.map((el) => (
          <div className="cm-revenue-item cm-flex-type-1" key={el._id}>
            <Avatar alt="Revenue" src={income} />
            <div className="cm-revenue-item-content cm-flex-type-1">
              <div className="cm-col cm-col1">
                {isPhone ? (
                  <p className="cm-categ-amt">{`${currency} ${currencyFormat(
                    el.categoryAmount
                  )}`}</p>
                ) : null}
                <p>{el.categoryName}</p>
              </div>
              <div className="cm-col cm-col2 cm-flex-type-1">
                {isPhone ? null : (
                  <p className="cm-categ-amt">{`${currency} ${currencyFormat(
                    el.categoryAmount
                  )}`}</p>
                )}

                <IconButton
                  aria-label="delete"
                  className="cm-edit-income-btn"
                  onClick={() => openForm(el)}
                >
                  <EditIcon />
                </IconButton>
                <DeleteMenu dispatchFn={() => deleteFn(el)} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RevenueGroup;
