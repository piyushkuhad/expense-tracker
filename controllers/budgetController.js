//This controller will handleBudget Operations
const moment = require('moment');

const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Budget = require('../models/budgetModel');
const UserInfo = require('../models/userInfoModel');

//Check if Budget Exists
const budgetExists = (reqUser, paramId, next) => {
  if (!reqUser.budget.includes(paramId)) {
    return next(new AppError('Budget does not exist', 400));
  }
};

//Check if Category already exists in UserInfo Model
const chkCategoryData = async (userId, categoryArr, categoryType, next) => {
  await UserInfo.findById(userId, async (err, doc) => {
    if (err) {
      return next(new AppError(err));
    }

    const userCategoryArr = doc[categoryType];

    categoryArr.map((categ) => {
      const categExists = userCategoryArr.some(
        (el) => el.categoryName === categ.categoryName
      );

      if (!categExists) {
        doc[categoryType].push(categ);
      }
    });

    doc.save();
  });
};

//Check if sub Category Exists in User Info Model
const chkSubCategoryData = async (
  userId,
  subCategoryData,
  userExpenseCategory,
  next
) => {
  await UserInfo.findById(userId, (err, userDoc) => {
    if (err) {
      return next(new AppError(err));
    }

    const userExpenseObj = userDoc.expenseCategories.filter(
      (el) => el.categoryValue === userExpenseCategory
    );

    //console.log('userExpenseCategory', userExpenseCategory);

    subCategoryData.forEach((el) => {
      const checkSubExists = userExpenseObj[0].subCategory.some(
        (catEl) => catEl.subCategoryValue === el.subCategoryValue
      );

      if (!checkSubExists) {
        userExpenseObj[0].subCategory.push({
          subCategoryName: el.subCategoryName,
          subCategoryValue: el.subCategoryValue,
        });
      }
    });

    userDoc.save((err, doc) => {
      if (err) {
        return next(new AppError(err));
      }
    });
  });
};

exports.createBudget = catchAsync(async (req, res, next) => {
  const budgetDoc = {
    ...req.body.budgetData,
    revenueData: req.body.revenueCategories,
    expenseData: req.body.expenseCategories,
  };

  console.log('Revenue:', req.body.revenueCategories);

  //Creating Revenue and Expense Categories in UserInfo Model
  chkCategoryData(req.user._id, budgetDoc.revenueData, 'revenueCategories');
  chkCategoryData(req.user._id, budgetDoc.expenseData, 'expenseCategories');

  await Budget.create(budgetDoc, async (err, doc) => {
    if (err) {
      return next(new AppError(err));
    }

    await UserInfo.findByIdAndUpdate(req.user._id, {
      $push: { budget: doc._id },
    });

    res.status(201).json({
      data: {
        status: 'success',
        data: doc,
      },
    });
  });
});

exports.getAllBudgets = catchAsync(async (req, res) => {
  const reqData = req.query.fields ? req.query.fields.split(',').join(' ') : '';

  const budget = await Budget.find({
    _id: {
      $in: req.user.budget,
    },
  })
    .sort({ createdAt: -1 })
    .select(reqData);

  if (!budget) {
    return next(new AppError('Budget not found', 404));
  }

  res.status(200).json({
    data: {
      status: 'success',
      data: budget,
    },
  });
});

exports.getBudget = catchAsync(async (req, res, next) => {
  budgetExists(req.user, req.params.id, next);

  const budget = await Budget.findById(req.params.id);

  //console.log('Budget', budget);

  if (!budget) {
    return next(new AppError('Budget does not exist', 404));
  }

  res.status(200).json({
    data: {
      status: 'success',
      data: budget,
    },
  });
});

exports.updateBudget = catchAsync(async (req, res, next) => {
  budgetExists(req.user, req.params.id, next);

  const budgetId = req.params.id;

  const { budgetName, budgetStartDate, budgetEndDate } = req.body.budgetData;

  //Date Validation before update
  if (moment(budgetStartDate) > moment(budgetEndDate)) {
    return next(
      new AppError('Start Date cannot be ahead of the End Date', 400)
    );
  }

  if (moment(budgetEndDate) < moment(budgetStartDate)) {
    return next(new AppError('End Date cannot be before Start Date', 400));
  }

  const budget = await Budget.findByIdAndUpdate(
    budgetId,
    {
      budgetName,
      budgetStartDate,
      budgetEndDate,
    },
    { new: true, runValidators: true }
  );

  if (!budget) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(200).json({
    data: {
      status: 'success',
      data: budget,
    },
  });
});

exports.deleteBudget = catchAsync(async (req, res, next) => {
  budgetExists(req.user, req.params.id, next);

  const budget = await Budget.findByIdAndDelete(req.params.id);

  if (!budget) {
    return next(new AppError('Budget does not exist', 400));
  }

  res.status(200).json({
    data: {
      status: 'success',
      data: null,
    },
  });
});

//CRUD FOR BUDGET CATEGORIES: REVENUEDATA & EXPENSEDATA

exports.addBudgetCategory = catchAsync(async (req, res, next) => {
  budgetExists(req.user, req.params.id, next);

  const budgetId = req.params.id;
  const type = req.params.type;

  const dataArrType =
    type === 'revenue' ? 'revenueCategories' : 'expenseCategories';
  const budgetCategoryType = type === 'revenue' ? 'revenueData' : 'expenseData';

  await chkCategoryData(req.user._id, [req.body.categoryData], dataArrType);

  const dataObj = req.body.categoryData;

  Budget.findByIdAndUpdate(
    budgetId,
    {
      $push: { [budgetCategoryType]: dataObj },
    },
    { new: true, runValidators: true },
    (err, doc) => {
      //console.log('DOC', doc);
      if (err) {
        return next(new AppError(err));
      }

      res.status(200).json({
        data: {
          status: 'success',
          data: doc,
        },
      });
    }
  );
});

exports.getBudgetCategory = catchAsync(async (req, res, next) => {
  budgetExists(req.user, req.params.id, next);

  const budgetId = req.params.id;
  const type = req.params.type;

  const dataProp = type === 'revenue' ? 'revenueData' : 'expenseData';

  const result = await Budget.findOne({ _id: budgetId }).select(dataProp);

  if (!result) {
    return next(new AppError('Not Found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: result,
  });
});

exports.updateBudgetCategory = catchAsync(async (req, res, next) => {
  budgetExists(req.user, req.params.id, next);

  const budgetId = req.params.id;
  const { type, categoryId } = req.params;
  const { categoryAmount, transactionDate } = req.body.categoryData;

  //const dataArr = type === 'revenue' ? 'revenueData' : 'expenseData';

  const dataArrType =
    type === 'revenue' ? 'revenueCategories' : 'expenseCategories';
  const budgetCategoryType = type === 'revenue' ? 'revenueData' : 'expenseData';

  //chkCategoryData(req.user._id, [req.body.categoryData], dataArrType);

  if (budgetId && type && categoryId) {
    await Budget.findOneAndUpdate(
      {
        _id: budgetId,
        [budgetCategoryType]: {
          $elemMatch: {
            _id: categoryId,
          },
        },
      },
      {
        $set: {
          [`${budgetCategoryType}.$.categoryAmount`]: categoryAmount,
          [`${budgetCategoryType}.$.transactionDate`]: transactionDate,
        },
      },
      { upsert: false, new: true, runValidators: true },
      (err, doc) => {
        if (err) {
          return next(new AppError(err));
        } else if (doc === null) {
          return next(
            new AppError(
              'Please check properties you are trying to update',
              400
            )
          );
        } else {
          res.status(200).json({
            data: {
              status: 'success',
              data: doc,
            },
          });
        }
      }
    );
  }
});

exports.deleteBudgetCategory = catchAsync(async (req, res, next) => {
  budgetExists(req.user, req.params.id, next);

  const budgetId = req.params.id;
  const { type, categoryId } = req.params;

  const dataArr = type === 'revenue' ? 'revenueData' : 'expenseData';

  await Budget.findOneAndUpdate(
    { _id: budgetId },
    {
      $pull: {
        [dataArr]: { _id: categoryId },
      },
    },
    { new: true },
    function (err) {
      if (err) {
        return next(new AppError(err));
      }

      res.status(200).json({
        data: {
          status: 'success',
          data: null,
        },
      });
    }
  );
});

//CRUD for EXPENSE SUB CATEGORIES
exports.createExpenseSubCategory = catchAsync(async (req, res, next) => {
  budgetExists(req.user, req.params.id, next);

  const budgetId = req.params.id;
  const { categoryId } = req.params;

  await Budget.findById(budgetId, async (err, doc) => {
    if (err) {
      return next(new AppError(err));
    }

    //Find Expense Category in Budget Model
    const expenseObj = await doc.expenseData.filter(
      (el) => el._id.toString() === categoryId
    );

    //Push data from body in SubCategory Array
    req.body.categoryData.forEach((el) => {
      expenseObj[0].subcategoryData.push(el);
    });
    doc.save((err, savedDoc) => {
      if (err) {
        return next(new AppError(err));
      }
    });

    //Add Sub Categories to user info model
    const expenseCategory = expenseObj[0].categoryValue;

    //console.log('expenseCategory', expenseCategory);

    //Adds new sub categories to user info model
    chkSubCategoryData(req.user._id, req.body.categoryData, expenseCategory);

    res.status(200).json({
      data: {
        status: 'success',
        data: doc,
      },
    });
  });
});

exports.updateExpenseSubCategory = catchAsync(async (req, res, next) => {
  budgetExists(req.user, req.params.id, next);

  const budgetId = req.params.id;
  const { categoryId, subCategoryId } = req.params;
  const { subCategoryAmount, transactionDate, payer, account } = req.body;

  await Budget.findById(budgetId, async (err, doc) => {
    if (err) {
      return next(new AppError(err));
    }

    //Find Expense Category in Budget Model
    const expenseObj = await doc.expenseData.filter(
      (el) => el._id.toString() === categoryId
    );

    const subCategoryObj = await expenseObj[0].subcategoryData.filter(
      (el) => el._id.toString() === subCategoryId
    );

    if (subCategoryObj.length === 1) {
      subCategoryObj[0].subCategoryAmount = subCategoryAmount;
      subCategoryObj[0].transactionDate = transactionDate;
      subCategoryObj[0].payer = payer;
      subCategoryObj[0].account = account;

      doc.save((err, savedDoc) => {
        if (err) {
          return next(new AppError(err));
        }
      });
    }

    res.status(200).json({
      data: {
        status: 'success',
        data: doc,
      },
    });
  });
});

exports.deleteExpenseSubCategory = catchAsync(async (req, res, next) => {
  budgetExists(req.user, req.params.id, next);

  const budgetId = req.params.id;
  const { categoryId, subCategoryId } = req.params;

  await Budget.findOneAndUpdate(
    {
      _id: budgetId,
      'expenseData._id': categoryId,
    },
    {
      $pull: {
        'expenseData.$.subcategoryData': {
          _id: subCategoryId,
        },
      },
    },
    { new: true },
    (err, doc) => {
      if (err) {
        return next(new AppError(err));
      }

      res.status(200).json({
        data: {
          status: 'success',
          data: null,
        },
      });
    }
  );
});
