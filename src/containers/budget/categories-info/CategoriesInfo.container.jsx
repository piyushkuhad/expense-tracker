import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';
import { IconButton } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import './CategoriesInfo.styles.scss';
import { grpCategByDate } from '../../../utils/utilFn';
import RevenueGroup from '../../../components/revenue-group/RevenueGroup.component';
import ExpenseGroup from '../../../components/expense-group/ExpenseGroup.component';
import FormDialog from '../../../components/forms/form-dialog/FormDialog.component';
import AddExpenseCategory from '../../../components/forms/AddExpenseCategory.component';
import { useDispatch, useSelector } from 'react-redux';
import { closeDialog } from '../../../redux/dialog-forms/dialog-form.actions';
import ContentDialog from '../../../components/content-dialog/ContentDialog.component';
import { deleteExpenseSubCategory } from '../../../redux/expense/expense.action';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const CategoriesInfo = ({ data }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [value, setValue] = React.useState(0);
  const [expenseDialog, setExpenseDialog] = React.useState(false);
  const [deleteDialog, setDeleteDialog] = React.useState(false);

  const formValues = useSelector((state) => state.forms);

  useEffect(() => {
    if (
      formValues &&
      Object.keys(formValues.formData).length > 0 &&
      formValues.formDialogName === 'expenseFormDialog'
    ) {
      setExpenseDialog(true);
    } else {
      setExpenseDialog(false);
    }
  }, [formValues, setExpenseDialog]);

  useEffect(() => {
    if (
      formValues &&
      Object.keys(formValues.formData).length > 0 &&
      formValues.formDialogName === 'deleteFormDialog'
    ) {
      setDeleteDialog(true);
    } else {
      setDeleteDialog(false);
    }
  }, [formValues, setDeleteDialog]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const closeExpenseDialog = () => {
    setExpenseDialog(false);
    //Return Dialog Values to its initial state
    setTimeout(() => dispatch(closeDialog()), 500);
  };

  //When Delete button is clicked
  const handleDeleteClick = () => {
    const data = {
      categoryId: formValues.formData.categoryId,
      _id: formValues.formData._id,
    };

    dispatch(deleteExpenseSubCategory(data));

    setTimeout(() => dispatch(closeDialog()), 500);
  };

  const closeDeleteDialog = () => {
    setDeleteDialog(false);

    //Return Dialog Values to its initial state
    setTimeout(() => dispatch(closeDialog()), 500);
  };

  // let revenueData = [];
  // revenueData = data.revenueData;

  const [revenueDataArr, setRevenueDataArr] = useState([]);
  const [expenseDataArr, setExpenseDataArr] = useState([]);

  useEffect(() => {
    if (data.revenueData && data.revenueData.length > 0) {
      setRevenueDataArr(grpCategByDate(data.revenueData));
    }
  }, [data.revenueData]);

  useEffect(() => {
    if (data.expenseData && data.expenseData.length > 0) {
      setExpenseDataArr(data.expenseData);
    }
  }, [data.expenseData]);

  return (
    <div className="cm-categories-info-container cm-flex-type-2">
      {/* Delete Dialog */}
      <ContentDialog
        dialogTitle="Delete"
        dialogOpenHandler={deleteDialog}
        dialogCloseHandler={closeDeleteDialog}
        handleButtonClick={handleDeleteClick}
        dialogSize="sm"
        cancelButtonColor="primary"
        buttonTitle="Delete"
        buttonColor="secondary"
      >
        <p className="cm-dialog-info-content">
          Are you sure you want to delete{' '}
          {formValues.formDialogName === 'deleteFormDialog' ? (
            <strong>{formValues.formData.name}</strong>
          ) : null}{' '}
          ?
        </p>
      </ContentDialog>
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="Category tabs"
          >
            <Tab label="Income" {...a11yProps(0)} />
            <Tab label="Expense" {...a11yProps(1)} />
          </Tabs>
          <IconButton
            aria-label="Add Category"
            color="primary"
            //onClick={() => openForm(data._id)}
            size="small"
            className="cm-add-category-btn"
          >
            <AddCircleIcon />
          </IconButton>
        </AppBar>
        <TabPanel value={value} index={0} className="cm-scroll cm-tab-panel">
          {revenueDataArr.length > 0 ? (
            revenueDataArr.map((el) => (
              <RevenueGroup
                date={el.date}
                categoryArr={el.categories}
                key={el.date}
              />
            ))
          ) : (
            <>
              <Skeleton variant="rect" width={'100%'} height={10} />
              <br />
              <Skeleton variant="rect" width={'80%'} height={10} />
              <br />
              <Skeleton variant="rect" width={'100%'} height={10} />
            </>
          )}
        </TabPanel>
        <TabPanel value={value} index={1} className="cm-scroll cm-tab-panel">
          {expenseDataArr.length !== 0 ? (
            expenseDataArr.map((el) => <ExpenseGroup data={el} key={el._id} />)
          ) : (
            <Skeleton variant="rect" width={'100%'} height={16} />
          )}
          <FormDialog
            dialogTitle="Add Your Expense"
            dialogOpenHandler={expenseDialog}
            dialogCloseHandler={closeExpenseDialog}
            dialogSize="sm"
          >
            <AddExpenseCategory />
          </FormDialog>
        </TabPanel>
      </div>
    </div>
  );
};

export default CategoriesInfo;
