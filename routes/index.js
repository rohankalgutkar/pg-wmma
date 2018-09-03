const saltRounds = 10;
var express = require('express');
var bcrypt = require('bcrypt');
var passport = require('passport');
var _ = require('lodash');
var localStrategy = require('passport-local').Strategy;
var router = express.Router();

var {
  mongoose
} = require('../db/mongoose');
var {
  User
} = require('../db/models/user');

// Auth
passport.use(new localStrategy(
  function(username, password, done) {
    User.findOne({
      username: username
    }, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, {
          message: 'Incorrect username.'
        });
      }

      bcrypt.compare(password, user.password).then(function(res) {
        if (!res) {
          return done(null, false, {
            message: 'Incorrect password.'
          });
        }
        return done(null, user);
      });
    });
  }
));


//  --------------------------------------- GET Routes --------------------------------------- //
// Home page
router.get('/', (req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect('/dashboard');
  } else {
    res.render('index', {
      title: 'Home | WMMA'
    });
  }
});
router.get('/index', (req, res, next) => {
  res.redirect('/');
});

// Login page
router.get('/login', (req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect('/dashboard');
  } else {
    res.render('login', {
      title: 'Login | WMMA'
    });
  }
});

// Register page
router.get('/register', (req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect('/dashboard');
  } else {
  res.render('register', {
    title: 'Register | WMMA'
  });
}
});

// Dashboard
router.get('/dashboard', authenticationMiddleware(), (req, res) => {
  console.log(req.session.passport.user);

  res.render('dashboard', {
    title: 'Dashboard | WMMA'
  })
});

// Assets
router.get('/assets', authenticationMiddleware(), (req, res) => {
  res.render('assets', {
    title: 'Assets | WMMA'
  })
});

// Liabilities
router.get('/liabilities', authenticationMiddleware(), (req, res) => {
  res.render('liabilities', {
    title: 'Liabilities | WMMA'
  })
});

// EMIs
router.get('/emi', authenticationMiddleware(), (req, res) => {
  res.render('emi', {
    title: 'EMIs | WMMA'
  })
});


// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

//  --------------------------------------- POST Routes --------------------------------------- //
// Login
router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: false
  })
);

// Register
router.post('/register', (req, res) => {
  console.log('Register form data: ' + JSON.stringify(req.body));
  var userObj = req.body;

  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    userObj.password = hash;
    var user = new User(userObj);

    user.save()
      .then(() => {
        console.log('Registeration successful.');
        User.findOne({
          username: userObj.username
        }, (err, result) => {

          console.log('Fetched the newly registered user: ' + result);

          const user_id = result._id;
          req.login(user_id, (err) => {
            res.redirect('/dashboard');
          });
        });
      })
      .catch((e) => {
        console.log('Unable to register user.');
        res.status(400).send(e);
      });
  });
});

// Auth setup
passport.serializeUser(function(user_id, done) {
  done(null, user_id);
});

passport.deserializeUser(function(user_id, done) {
  // User.findById(id, function (err, user) {
  //   done(err, user);
  // });
  done(null, user_id);
});

function authenticationMiddleware() {
  return (req, res, next) => {
    // console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);

    if (req.isAuthenticated()) return next();
    res.redirect('/login')
  }
}

module.exports = router;
