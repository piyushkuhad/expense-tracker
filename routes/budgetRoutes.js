const express = require('express');
const userInfoController = require('../controllers/userInfoController');
const budgetController = require('../controllers/budgetController');

const router = express.Router();

router.use(userInfoController.protect);

router
  .route('/')
  .get(budgetController.getAllBudgets)
  .post(budgetController.createBudget);

router
  .route('/:id')
  .get(budgetController.getBudget)
  .patch(budgetController.updateBudget)
  .delete(budgetController.deleteBudget);

//Budget Categories - Revenue & Expense
router
  .route('/:id/category/:type/:categoryId?')
  .post(budgetController.addBudgetCategory)
  .get(budgetController.getBudgetCategory)
  .patch(budgetController.updateBudgetCategory)
  .delete(budgetController.deleteBudgetCategory);

//Expense Sub-Categories - Revenue & Expense
router
  .route('/:id/subcategory/:categoryId/:subCategoryId?')
  .post(budgetController.createExpenseSubCategory)
  .patch(budgetController.updateExpenseSubCategory)
  .delete(budgetController.deleteExpenseSubCategory);

module.exports = router;
