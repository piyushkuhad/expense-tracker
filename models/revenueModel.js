const mongoose = require('mongoose');

const revenueSchema = new mongoose.Schema({
  categoryName: {
    type: String,
    trim: true,
    maxlength: [40, 'Revenue name must not be more than 40 characters'],
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

const Revenue = mongoose.model('Revenue', revenueSchema);

module.exports = Revenue;
