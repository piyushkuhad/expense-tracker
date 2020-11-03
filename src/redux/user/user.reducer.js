import { userTypes } from './user.types';

const INITIAL_STATE = {
  user: {},
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userTypes.SIGN_IN:
    case userTypes.SIGN_UP:
      return {
        ...action.payload.data,
        _atk: action.payload.token,
        currency: { cc: 'INR', symbol: '\u20B9', name: 'Indian rupee' },
      };

    case userTypes.LOGOUT:
      return { ...INITIAL_STATE };

    default:
      return state;
  }
};

export default userReducer;
