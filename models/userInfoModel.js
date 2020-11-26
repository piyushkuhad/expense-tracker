const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const revenueSchema = new mongoose.Schema({
  categoryName: {
    type: String,
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

const expenseSchema = new mongoose.Schema({
  categoryName: {
    type: String,
    maxlength: [40, 'Expense name must not be more than 40 characters'],
  },
  categoryValue: {
    type: String,
  },
  defaultCategory: {
    type: Boolean,
    default: false,
  },
  subCategory: [
    {
      subCategoryName: String,
      subCategoryValue: String,
    },
  ],
  added: Boolean,
});

const userInfoSchema = new mongoose.Schema({
  fullName: {
    type: String,
    trim: true,
    required: [true, 'Full Name is required'],
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    trim: true,
    required: [true, 'Email is required'],
    validate: {
      validator: function (val) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(val);
      },
      message: '{VALUE} is not a valid Email ID.',
    },
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'Password is required.'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Confirm Password is required'],
    minlength: 8,
    select: false,
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: 'Passwords do not match',
    },
  },
  budget: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Budget',
    },
  ],
  revenueCategories: {
    type: [revenueSchema],
  },
  expenseCategories: {
    type: [expenseSchema],
  },
  accountType: {
    type: String,
    enum: ['custom', 'google'],
    default: 'custom',
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

userInfoSchema.pre('save', async function (next) {
  //If password is not modified
  if (!this.isModified('password')) return next();

  //Hash the password with the cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  //Delete Password confirm field
  this.passwordConfirm = undefined;
  next();
});

//Adding new Method to UserInfo Schema

//Check for Password
userInfoSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userInfoSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'revenueCategories',
    select: '-__v -_id',
  }).populate({
    path: 'revenueCategories',
    select: '-__v -_id',
  });

  next();
});

const UserInfo = mongoose.model('UserInfo', userInfoSchema);

module.exports = UserInfo;
