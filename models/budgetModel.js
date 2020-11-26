const mongoose = require('mongoose');
const moment = require('moment');
const AppError = require('../utils/appError');

const revenueSchema = new mongoose.Schema({
  // categoryData: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: 'UserInfo',
  // },
  categoryName: {
    type: String,
    required: [true, 'Revenue category name is required'],
    maxlength: [40, 'Revenue name must not be more than 40 characters'],
  },
  categoryValue: {
    type: String,
    required: [true, 'Revenue category value is required'],
  },
  categoryAmount: {
    type: Number,
    required: [true, 'Revenue must have an amount'],
    min: [0, 'Amount cannot be less than 0'],
  },
  transactionDate: {
    type: Date,
    required: [true, 'Revenue must have a Date'],
  },
  payer: String,
  account: String,
  transactionType: {
    type: String,
    default: 'revenue',
  },
  added: Boolean,
});

const subCategorySchema = new mongoose.Schema({
  subCategoryName: {
    type: String,
    required: [true, 'Expense sub category name is required'],
    maxlength: [
      40,
      'Expense sub category name must not be more than 40 characters',
    ],
  },
  subCategoryValue: {
    type: String,
    required: [true, 'Expense category value is required'],
  },
  subCategoryAmount: {
    type: Number,
    required: [true, 'Expense sub category must have an amount'],
    min: [0, 'Amount cannot be less than 0'],
    default: 0,
  },
  transactionDate: {
    type: Date,
    required: [true, 'Expense sub category must have a Date'],
  },
  payer: String,
  account: String,
});

const expenseSchema = new mongoose.Schema({
  // categoryData: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: 'UserInfo',
  // },
  categoryName: {
    type: String,
    required: [true, 'Expense category name is required'],
    maxlength: [40, 'Expense name must not be more than 40 characters'],
  },
  categoryValue: {
    type: String,
    required: [true, 'Expense category value is required'],
  },
  categoryAmount: {
    type: Number,
    required: [true, 'Expense must have an amount'],
    min: [0, 'Amount cannot be less than 0'],
  },
  transactionType: {
    type: String,
    default: 'expense',
  },
  subcategoryData: { type: [subCategorySchema] },
  added: Boolean,
});

const budgetSchema = new mongoose.Schema({
  budgetName: {
    type: String,
    trim: true,
    required: [true, 'Budget Name is required'],
    maxlength: [40, 'Budget name must not be more than 40 characters'],
  },
  budgetStartDate: {
    type: Date,
    required: [true, 'Budget must have a start date'],
  },
  budgetEndDate: {
    type: Date,
    required: [true, 'Budget must have an end date'],
  },
  revenueData: { type: [revenueSchema] },
  expenseData: { type: [expenseSchema] },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

//Query Middleware: For populating budget with revenue and expense categories for any Find query
budgetSchema.pre(/^find/, function (next) {
  // this.populate({
  //   path: 'revenueData',
  //   populate: [
  //     {
  //       path: 'categoryData',
  //       select: '-__v -_id',
  //     },
  //   ],
  // }).populate({
  //   path: 'expenseData',
  //   populate: [
  //     {
  //       path: 'categoryData',
  //       select: '-__v -_id',
  //     },
  //   ],
  // });
  next();
});

budgetSchema.pre('validate', function (next) {
  const startDate = moment(this.budgetStartDate);
  const endDate = moment(this.budgetEndDate);

  //console.log(`Start date: ${startDate} and End Date: ${endDate}`);

  if (startDate > endDate) {
    return next(
      new AppError('Start Date cannot be ahead of the End Date', 400)
    );
  }

  if (endDate < startDate) {
    return next(new AppError('End Date cannot be before Start Date', 400));
  }

  next();
});

const Budget = mongoose.model('Budget', budgetSchema);

module.exports = Budget;
