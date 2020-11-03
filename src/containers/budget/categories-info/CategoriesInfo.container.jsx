import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';

import './CategoriesInfo.styles.scss';
import { grpCategByDate } from '../../../utils/utilFn';
import RevenueGroup from '../../../components/revenue-group/RevenueGroup.component';
import ExpenseGroup from '../../../components/expense-group/ExpenseGroup.component';

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
          <Typography>{children}</Typography>
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
  const [value, setValue] = React.useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let revenueData = [];
  revenueData = data.revenueData;

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
        </AppBar>
        <TabPanel value={value} index={0} className="cm-scroll">
          {revenueDataArr.length > 0 ? (
            revenueDataArr.map((el) => (
              <RevenueGroup
                date={el.date}
                categoryArr={el.categories}
                key={el._id}
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
        <TabPanel value={value} index={1} className="cm-scroll">
          {expenseDataArr.length !== 0 ? (
            expenseDataArr.map((el) => <ExpenseGroup data={el} key={el._id} />)
          ) : (
            <Skeleton variant="rect" width={'100%'} height={16} />
          )}
        </TabPanel>
      </div>
    </div>
  );
};

export default CategoriesInfo;
