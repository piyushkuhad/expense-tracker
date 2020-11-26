const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  categoryName: {
    type: String,
    trim: true,
    maxlength: [40, 'Expense name must not be more than 40 characters'],
  },
  categoryValue: {
    type: String,
  },
  defaultCategory: {
    type: Boolean,
    default: false,
  },
  added: Boolean,
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
