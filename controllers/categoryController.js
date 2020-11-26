const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Revenue = require('../models/revenueModel');
const Expense = require('../models/expenseModel');

const selectModelType = (categoryType) => {
  let Model;

  if (categoryType === 'revenue') {
    Model = Revenue;
  }
  if (categoryType === 'expense') {
    Model = Expense;
  }

  return Model;
};

exports.createCategory = catchAsync(async (req, res, next) => {
  //console.log(req.body);
  console.log('Run 2');

  const categoryDoc = req.body;

  let category;

  if (req.body.type === 'revenue') {
    category = await Revenue.create(categoryDoc);
  }

  if (req.body.type === 'expense') {
    category = await Expense.create(categoryDoc);
  }

  res.status(201).json({
    data: {
      status: 'success',
      category,
    },
  });
});

exports.getCategory = catchAsync(async (req, res, next) => {
  const categType = req.params.type;

  const id = req.params.id;

  let resultCategory;

  if (categType === 'revenue' && id === undefined) {
    resultCategory = await Revenue.find();
  } else if (categType === 'revenue' && id !== undefined) {
    resultCategory = await Revenue.findById(id);
  }

  if (categType === 'expense' && id === undefined) {
    resultCategory = await Expense.find();
  } else if (categType === 'expense' && id !== undefined) {
    resultCategory = await Expense.findById(id);
  }

  if (!resultCategory) {
    return next(new AppError('No category found', 404));
  }

  res.status(200).json({
    data: {
      status: 'success',
      resultCategory,
    },
  });
});

exports.getAllCategories = catchAsync(async (req, res, next) => {
  const revenueCategories = await Revenue.find();
  const expenseCategories = await Expense.find();

  res.status(200).json({
    data: {
      status: 'success',
      revenueCategories,
      expenseCategories,
    },
  });
});

exports.updateCategory = catchAsync(async (req, res, next) => {
  const categType = req.params.type;
  const categId = req.params.id;
  const { categoryName, categoryValue } = req.body;

  const Model = selectModelType(categType);

  const category = await Model.findOneAndUpdate(
    { _id: categId, defaultCategory: { $ne: true } }, //Filter
    { categoryName, categoryValue }, //Data to be Updated
    { new: true } //Returns updated document
  );

  if (category === null) {
    res.status(400).json({
      data: {
        status: 'fail',
        message:
          'Category you are trying to update is either a default category or does not exist.',
      },
    });
  }

  res.status(200).json({
    data: {
      status: 'success',
      category,
    },
  });
});

exports.deleteCategory = catchAsync(async (req, res) => {
  const categType = req.params.type;
  const categId = req.params.id;

  const Model = selectModelType(categType);

  const category = await Model.findOneAndDelete(
    { _id: categId, defaultCategory: { $ne: true } } //Filter
  );

  if (category === null) {
    res.status(400).json({
      data: {
        status: 'fail',
        message:
          'Category you are trying to delete is either a default category or does not exist.',
      },
    });
  }

  res.status(204).json({
    data: {
      status: 'success',
      data: null,
    },
  });
});
