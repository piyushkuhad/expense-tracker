import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useDispatch } from 'react-redux';

import ButtonWrapper from '../button/ButtonWrapper.component';
import './form.styles.scss';
import { signUp } from '../../redux/user/user.actions';
import { loaderStart } from '../../utils/utilFn';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '100%',
    },
    '& .MuiFormControl-root': {
      //margin: theme.spacing(1),
      width: '100%',
    },
  },
}));

const SignUp = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    fullName: '',
    email: '',
    password: '',
    passwordConfirm: '',
    showPassword: false,
    showPasswordConfirm: false,
  });

  const [formError, setFormError] = useState(false);
  const [passError, setPassError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('SignUp Data:', values);

    const { fullName, email, password, passwordConfirm } = values;

    if (
      fullName === '' ||
      email === '' ||
      password === '' ||
      passwordConfirm === ''
    ) {
      setFormError(true);
      return;
    } else {
      setFormError(false);
    }

    console.log('Run');

    if (passError) {
      return;
    }

    dispatch(
      signUp({
        fullName: fullName,
        email: email,
        password: password,
        passwordConfirm: passwordConfirm,
      })
    );
    loaderStart(dispatch, 'login', 'Save money & money will save you!!');
  };

  const handleChange = (fieldName) => (event) => {
    setValues({ ...values, [fieldName]: event.target.value });
  };

  const handleClickShowPassword = (fieldName) => {
    //setValues({ ...values, showPassword: !values.showPassword });
    setValues({ ...values, [fieldName]: !values[fieldName] });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const chkPassword = () => {
    if (values.passwordConfirm !== values.password) setPassError(true);
    else setPassError(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`${classes.root} cm-form-container`}
      autoComplete="false"
    >
      <div className="cm-form-field">
        <TextField
          label="Full Name*"
          type="text"
          InputLabelProps={{
            shrink: true,
          }}
          autoFocus
          variant="outlined"
          name="fullName"
          error={formError && values.fullName === ''}
          value={values.fullName}
          onChange={handleChange('fullName')}
        />
      </div>
      <div className="cm-form-field">
        <TextField
          label="Email*"
          type="email"
          error={formError && values.email === ''}
          InputLabelProps={{
            shrink: true,
            form: {
              autocomplete: 'off',
            },
          }}
          variant="outlined"
          name="email"
          value={values.email}
          onChange={handleChange('email')}
        />
      </div>
      <div className="cm-form-field">
        <FormControl
          //className={clsx(classes.margin, classes.textField)}
          variant="outlined"
        >
          <InputLabel>Password*</InputLabel>
          <OutlinedInput
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            error={formError && values.password === ''}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => handleClickShowPassword('showPassword')}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />
        </FormControl>
      </div>
      <div className="cm-form-field">
        <FormControl
          //className={clsx(classes.margin, classes.textField)}
          variant="outlined"
        >
          <InputLabel>Confirm Password*</InputLabel>
          <OutlinedInput
            type={values.showPasswordConfirm ? 'text' : 'password'}
            value={values.passwordConfirm}
            onChange={handleChange('passwordConfirm')}
            error={passError || (formError && values.passwordConfirm === '')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => handleClickShowPassword('showPasswordConfirm')}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPasswordConfirm ? (
                    <Visibility />
                  ) : (
                    <VisibilityOff />
                  )}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={140}
            onBlur={() => chkPassword()}
          />
          {passError ? (
            <FormHelperText className="cm-error-msg">
              Passwords do not match
            </FormHelperText>
          ) : null}
          {formError ? (
            <FormHelperText className="cm-error-msg">
              Required Fields(*) can't be left empty.
            </FormHelperText>
          ) : null}
        </FormControl>
      </div>
      <div className="cm-form-field">
        <ButtonWrapper
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          className="cm-fw-btn"
          size="large"
          disabled={passError}
        >
          Sign Up
        </ButtonWrapper>
      </div>
    </form>
  );
};

export default SignUp;
