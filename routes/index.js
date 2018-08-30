var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/login', (req, res, next) => {
  res.render('login', {
    title: 'Login | WMMA'
  });
});

// POST login page
router.post('/login', (req, res) => {
  console.log('Form data: ' + JSON.stringify(req.body));
  res.redirect('/dashboard');
});


// Get Dashboard / home page
router.get('/dashboard', (req, res, next) => {
  res.render('dashboard', {
    title: 'Dashboard | WMMA',
    emailid: 'hello@rohankalgutkar.in'
  });
});

module.exports = router;
