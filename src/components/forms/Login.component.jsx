import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useDispatch } from 'react-redux';

import ButtonWrapper from '../button/ButtonWrapper.component';
import './form.styles.scss';
import { signIn } from '../../redux/user/user.actions';
import Loader from '../loader/Loader.component';

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

const Login = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    email: '',
    password: '',
    showPassword: false,
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Data:', values);

    dispatch(signIn({ email: values.email, password: values.password }));
    setLoading(true);
  };

  const handleChange = (fieldName) => (event) => {
    setValues({ ...values, [fieldName]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      {loading ? <Loader /> : null}
      <form
        onSubmit={handleSubmit}
        className={`${classes.root} cm-form-container`}
      >
        <div className="cm-form-field">
          <TextField
            label="Email"
            type="email"
            InputLabelProps={{
              shrink: true,
            }}
            autoFocus
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
            <InputLabel>Password</InputLabel>
            <OutlinedInput
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange('password')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
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
          <ButtonWrapper
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            className="cm-fw-btn"
            size="large"
          >
            Login
          </ButtonWrapper>
        </div>
      </form>
    </>
  );
};

export default Login;
