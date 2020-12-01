import React, { useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { useForm, Controller } from 'react-hook-form';
import moment from 'moment';
import ButtonWrapper from '../button/ButtonWrapper.component';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';

import NewDatePickerRange from '../date-picker/NewDatePickerRange.component';
import { createBudget } from '../../redux/budget/budget.actions';
import { toISOFormat } from '../../utils/dateMethods';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
}));

const CreateBudget = (props) => {
  const classes = useStyles();
  const { initialValues, update } = props;
  const { handleSubmit, control, errors, reset } = useForm();
  const dispatch = useDispatch();

  const initialDate = moment().format();
  const nextDate = moment().add(1, 'months').format();

  const onSubmit = (data) => {
    //console.log(data);
    const dataToDispatch = {
      budgetName: data.budgetName,
      budgetStartDate: toISOFormat(data.budgetDateRange.startVal),
      budgetEndDate: toISOFormat(data.budgetDateRange.endVal),
    };
    dispatch(createBudget(dataToDispatch));
    props.onSubmit(data);
  };

  useEffect(() => {
    reset(initialValues);
    // eslint-disable-next-line
  }, [reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${classes.root} cm-form-container`}
    >
      <div className="cm-form-field">
        <Controller
          as={<TextField label="Budget Name" error={!!errors.budgetName} />}
          name="budgetName"
          rules={{ required: true }}
          control={control}
        />
      </div>
      <Controller
        defaultValue={
          update
            ? initialValues.budgetDateRange
            : { startVal: initialDate, endVal: nextDate }
        }
        render={(dateChangeHandler, onBlur, value) => (
          <NewDatePickerRange
            dateChangeHandler={dateChangeHandler}
            onBlur={onBlur}
            showDates={
              update
                ? initialValues.budgetDateRange
                : { startVal: initialDate, endVal: nextDate }
            }
            selected={value}
            startLabel="Budget Start Date"
            endLabel="Budget End Date"
          />
        )}
        name="budgetDateRange"
        control={control}
      />
      <div className="cm-form-field">
        <ButtonWrapper
          variant="contained"
          color="primary"
          onClick={handleSubmit(onSubmit)}
        >
          {props.buttonText}
        </ButtonWrapper>
      </div>
    </form>
  );
};

CreateBudget.defaultProps = {
  update: false,
  buttonText: 'Create Budget',
};

export default CreateBudget;
