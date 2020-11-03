import React from 'react';
import { useForm, Controller } from 'react-hook-form';

import './form.styles.scss';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
}));

const AddExpenseCategory = (props) => {
  const classes = useStyles();

  const { handleSubmit, control, errors, reset, setValue } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${classes.root} cm-form-container`}
    >
      <div className="cm-form-field">
        <Controller
          as={
            <TextField
              label="Add Expense"
              error={!!errors.categoryName}
              autoFocus
              InputLabelProps={{
                shrink: true,
              }}
            />
          }
          name="categoryName"
          rules={{ required: true }}
          control={control}
        />
      </div>
      <div className="cm-form-field">
        <Controller
          as={
            <TextField
              label="Expense Budget"
              type="number"
              error={!!errors.categoryAmount}
              helperText="Set Budget for your Expense"
            />
          }
          name="categoryAmount"
          rules={{ required: true }}
          control={control}
        />
      </div>
      <div className="cm-form-field">
        <ButtonWrapper
          variant="contained"
          color="primary"
          onClick={handleSubmit(onSubmit)}
        >
          {update ? 'Update' : 'Add'} Expense Category
        </ButtonWrapper>
      </div>
    </form>
  );
};

export default AddExpenseCategory;
