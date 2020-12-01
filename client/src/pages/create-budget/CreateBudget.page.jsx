import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import './CreateBudget.styles.scss';
import CreateBudget from '../../components/forms/CreateBudget.component';
import budget from '../../assets/images/budget.png';
import AddRevenueContainer from '../../containers/add-revenue-container/AddRevenue.container';
import AddExpenseContainer from '../../containers/add-expense-container/AddExpense.container';
import {
  clearCreateBudget,
  createBudgetRequest,
} from '../../redux/budget/budget.actions';
import { loaderStart } from '../../utils/utilFn';
import Header from '../../components/header/Header.component';
import history from '../../history';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const CreateBudgetPage = () => {
  const classes = useStyles();

  //Declaring Steps Data
  const getSteps = () => {
    return [
      'Create Budget',
      'Add Your Disposable Income',
      'Add Expense Category',
    ];
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <CreateBudget
              initialValues={createBudgetFormData}
              onSubmit={createBudgetSubmitHandler}
              update={true}
            />
            <img src={budget} alt="Budget" />
          </>
        );
      case 1:
        return (
          <>
            <AddRevenueContainer />
          </>
        );
      case 2:
        return (
          <>
            <AddExpenseContainer />
          </>
        );
      default:
        return 'Unknown step';
    }
  };

  //Clear Previous Data Stored in State when component is mounted
  useEffect(() => {
    dispatch(clearCreateBudget());
    // eslint-disable-next-line
  }, []);

  //Steps State Declaration
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const steps = getSteps();

  //Create Budget Form State declaration
  const createBudgetFormValues = {
    budgetName: '',
    budgetDateRange: {
      startVal: moment().format(),
      endVal: moment().add(1, 'months').format(),
    },
  };

  const [iscreateBudgetSubmit, setIsCreateBudgetSubmit] = useState(false);
  const [createBudgetFormData, setCreateBudgetFormData] = useState(
    createBudgetFormValues
  );

  const createBudgetSubmitHandler = (formData) => {
    //console.log('Got Form Data', formData);
    setCreateBudgetFormData(formData);
    setIsCreateBudgetSubmit(true);
    setActiveStep(1);
  };

  const isStepOptional = (step) => {
    return step === 1 || step === 2;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    if (activeStep === 0 && !iscreateBudgetSubmit) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    if (activeStep > 0) setActiveStep((prevActiveStep) => prevActiveStep - 1);
    else history.goBack();
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const dispatch = useDispatch();
  const handleFinish = () => {
    loaderStart(dispatch, 'default', 'Creating Budget...');
    dispatch(createBudgetRequest());
  };

  return (
    <>
      <Header />
      <div className={`${classes.root} cm-create-budget-page-container`}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption">Optional</Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>
                All steps completed - you&apos;re finished
              </Typography>
              <Button onClick={handleReset} className={classes.button}>
                Reset
              </Button>
            </div>
          ) : (
            <div>
              <div className={`${classes.instructions} cm-form-wrapper`}>
                {getStepContent(activeStep)}
              </div>
              <div>
                <Button
                  //disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.button}
                >
                  Back
                </Button>
                {isStepOptional(activeStep) && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSkip}
                    className={classes.button}
                  >
                    Skip
                  </Button>
                )}
                {activeStep === 0 ? null : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={activeStep === 2 ? handleFinish : handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CreateBudgetPage;
