var express = require('express');
var router = express.Router();

//  --------------------------------------- GET Routes --------------------------------------- //
// Home page
router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'Home | WMMA'
  });
});
router.get('/index', (req, res, next) => {
  res.redirect('/');
});

// Login page
router.get('/login', (req, res, next) => {
  res.render('login', {
    title: 'Login | WMMA'
  });
});

// Register page
router.get('/register', (req, res, next) => {
  res.render('register', {
    title: 'Register | WMMA'
  });
});

// Dashboard
router.get('/dashboard', (req, res, next) => {
  res.render('dashboard', {
    title: 'Dashboard | WMMA',
    emailid: 'hello@rohankalgutkar.in'
  });
});

//  --------------------------------------- POST Routes --------------------------------------- //
// Login
router.post('/login', (req, res) => {
  console.log('Login form data: ' + JSON.stringify(req.body));
  res.redirect('/dashboard');
});

// Register
router.post('/register', (req, res) => {
  console.log('Register form data: ' + JSON.stringify(req.body));
  res.redirect('/dashboard');
});

module.exports = router;
