import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import { Link } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';

import './BudgetInfo.styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllBudgets,
  selectedBudget,
} from '../../../redux/budget/budget.actions';
import DonutChart from '../../../components/charts/DonutChart.component';
import { currencyFormat } from '../../../utils/utilFn';
import ColorLegend from '../../../components/charts/ColorLegend.component';

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 150,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const BudgetInfo = ({ budgetValuesData }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const budgetNames = useSelector((state) => state.budget.budgetSnippetData);
  const currency = useSelector((state) => state.user.currency.symbol);

  const [budget, setBudget] = React.useState('Select Budget');

  const handleChange = (event) => {
    setBudget(event.target.value);
    dispatch(selectedBudget(event.target.value));
  };

  //Api call to get user's budgets
  useEffect(() => {
    if (budgetNames.length === 0 || !budgetNames) {
      dispatch(getAllBudgets('budgetName'));
    }
  }, [dispatch, budgetNames]);

  //Set Select value on response and sets the Selected Budget in state
  useEffect(() => {
    if (budgetNames && budgetNames.length > 0) {
      setBudget(budgetNames[0]._id);
      dispatch(selectedBudget(budgetNames[0]._id));
    }
    //eslint-disable-next-line
  }, [budgetNames]);

  //Total Revenue, Expense and Savings
  let { revenueTotal, expenseTotal } = budgetValuesData ? budgetValuesData : 0;

  const available = revenueTotal - expenseTotal;

  //ChartData
  const chartData = [
    { name: 'Income', value: revenueTotal },
    { name: 'Expense', value: expenseTotal },
    {
      name: 'Available',
      value: available,
    },
  ];
  const chartColors = ['#4caf50', '#f44336', '#e6e6e6'];

  return (
    <div className="cm-budget-info-container">
      <div className="cm-budget-header cm-flex-type-1">
        <h2>Home</h2>
        <div className="cm-budget-filter cm-flex-type-1">
          <FormControl className={classes.formControl}>
            <Select
              value={budget}
              onChange={handleChange}
              displayEmpty
              className={classes.selectEmpty}
              inputProps={{ 'aria-label': 'Without label' }}
            >
              {budgetNames.length > 0 ? (
                budgetNames.map((el) => (
                  <MenuItem key={el._id} value={el._id}>
                    {el.budgetName}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value="" disabled>
                  No Budget
                </MenuItem>
              )}
            </Select>
          </FormControl>
          <div className="cm-add-budget-btn">
            <Tooltip title="Create new Budget" placement="right">
              <Fab
                color="primary"
                aria-label="Create new Budget"
                component={Link}
                to="/create-budget"
                variant="round"
                className="cm-button-link"
                size="small"
              >
                <AddIcon />
              </Fab>
            </Tooltip>
          </div>
        </div>
      </div>
      <div className="cm-budget-row1 cm-widget-container box-shadow-2">
        <div className="cm-row-fluid cm-flex-type-1">
          <div className="cm-col-half cm-content">
            <h3>Budget</h3>
            <ColorLegend legendColor="#4caf50">
              <p>
                Income:
                <span>{`${currency} ${currencyFormat(revenueTotal)}`}</span>
              </p>
            </ColorLegend>

            <ColorLegend legendColor="#f44336">
              <p>
                Expenses:
                <span>{`${currency} ${currencyFormat(expenseTotal)}`}</span>
              </p>
            </ColorLegend>
            <ColorLegend legendColor="#e6e6e6">
              <p>
                Available:
                <span>{`${currency} ${currencyFormat(available)}`}</span>
              </p>
            </ColorLegend>
          </div>
          <div
            className="cm-col-half cm-chart cm-flex-type-2"
            style={{ height: 250 }}
          >
            <DonutChart
              chartData={chartData}
              chartColors={chartColors}
              currency={currency}
              line1={currency + currencyFormat(available)}
              line2="Savings"
            />
          </div>
        </div>
      </div>
      <div className="cm-col-divider cm-budget-row2">
        <div className="cm-row-fluid cm-flex-type-1">
          <div className="cm-col-half cm-widget-container box-shadow-2">
            <h4>Disposable Income</h4>
            <h2 style={{ color: '#4caf50' }}>{`${currency} ${currencyFormat(
              revenueTotal
            )}`}</h2>
          </div>
          <div className="cm-col-half cm-widget-container box-shadow-2">
            <h4>Total Expenses</h4>
            <h2 style={{ color: '#f44336' }}>{`${currency} ${currencyFormat(
              expenseTotal
            )}`}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetInfo;
