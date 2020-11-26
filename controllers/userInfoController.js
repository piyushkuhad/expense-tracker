const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const UserInfo = require('../models/userInfoModel');
const sendWelcomeMail = require('../utils/email');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true, //cannot be accessed or modified by the browser, prevents XSS attacks
  };

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true; //cookie will be sent on secure connections only

  res.cookie('token', token, cookieOptions);

  //hide user password in response
  user.password = undefined;

  //console.log(res.cookie());

  res.status(statusCode).json({
    data: {
      status: 'success',
      token,
      data: {
        user,
      },
    },
  });
};

exports.signUp = catchAsync(async (req, res, next) => {
  const newUser = {
    fullName: req.body.fullName,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    budget: [],
    revenueCategories: [],
    expenseCategories: [],
  };

  const user = await UserInfo.create(newUser);

  if (!user) {
    return next(new AppError('Invalid data. Unable to create the user', 400));
  }

  //Send Welcome EMail
  const firstName = user.fullName.split(' ');
  sendWelcomeMail(user.email, 'Welcome to Expensum!', firstName[0]);

  //send response with token
  createSendToken(user, 201, res);

  //const token = await signToken(user._id);
  // res.status(201).json({
  //   data: {
  //     status: 'success',
  //     token,
  //     data: user,
  //   },
  // });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //console.log(req.body);

  //Check if email & password exists
  if (!email || !password) {
    return new AppError('Please provide email and/or password', 400);
  }

  const user = await UserInfo.findOne({ email }).select('+password +fullName');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect Email and/or Password', 401)); //unauthorized
  }

  //Send Response
  createSendToken(user, 200, res);

  // const token = signToken(user._id);
  // res.status(200).json({
  //   data: {
  //     status: 'success',
  //     token,
  //   },
  // });
});

exports.logout = catchAsync(async (req, res, next) => {
  res.cookie('token', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({ status: 'success' });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await UserInfo.find();

  if (!users) {
    return next(new AppError('No users exists', 404));
  }

  res.status(200).json({
    data: {
      status: 'success',
      data: users,
    },
  });
});

//Protected Routes
exports.protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return next(new AppError('You are not logged in. Please log in', 400));
  }

  //Verify token by converting verification request into a promise using promisify
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  //console.log(decoded);

  //Check if user still exists
  const user = await UserInfo.findById(decoded.id);

  if (!user) {
    return next(new AppError('The user no longer exists', 401));
  }

  //Grant access to protected route
  req.user = user;

  next();
});

//Role based access to roles
//Use after protect middleware

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }

    next();
  };
};
