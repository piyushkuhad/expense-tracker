import { userTypes } from './user.types';
import { appTypes } from '../app/app.types';
import axios from 'axios';
import history from '../../history';
import { persistor } from '../store';

axios.defaults.withcredentials = true;

export const signIn = (data) => async (dispatch, getState) => {
  try {
    const res = await axios.post(
      'http://127.0.0.1:4000/api/v1/user/login',
      data,
      {
        withCredentials: true,
        headers: { 'Access-Control-Allow-Credentials': true },
      }
    );
    console.log('User', res);

    let result = {};

    if (res.data.data.status === 'success') {
      result = res.data.data;
    }

    dispatch({
      type: userTypes.SIGN_IN,
      payload: result,
    });
  } catch (err) {
    let errorMsg = 'There was some error. Please try again.';

    if (err.response) {
      console.log('Response:', err.response);
      errorMsg = err.response.data.message;
    } else if (err.request) {
      console.log('Request:', err.response);
      errorMsg =
        'Unable to connect to server. Please check your internet connection.';
    }

    dispatch({
      type: appTypes.INFO_ERROR,
      payload: errorMsg,
    });
    history.push('/auth');
  }
};

export const signUp = (data) => ({
  type: userTypes.SIGN_UP,
  payload: data,
});

export const logout = () => async (dispatch, getState) => {
  try {
    const res = await axios.get('http://127.0.0.1:4000/api/v1/user/logout', {
      withCredentials: true,
    });

    console.log('Logout', res);

    if (res.data.status === 'success') {
      history.push('/auth');
      persistor.purge();
    }

    dispatch({
      type: userTypes.LOGOUT,
    });
  } catch (err) {
    console.log(err);
  }
};