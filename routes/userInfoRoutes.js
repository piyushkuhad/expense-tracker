const express = require('express');
const userInfoController = require('../controllers/userInfoController');

const router = express.Router();

router
  .route('/')
  .get(
    userInfoController.protect,
    userInfoController.restrictTo('admin'),
    userInfoController.getAllUsers
  );

router.route('/signup').post(userInfoController.signUp);
router.route('/login').post(userInfoController.login);
router.route('/logout').get(userInfoController.logout);

module.exports = router;
