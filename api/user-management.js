
var {
  mongoose
} = require('../db/mongoose');
var {
  User
} = require('../db/models/user');



console.log('Register form data: ' + JSON.stringify(req.body));

var registerUser = function () {
  var user = new User(req.body);
  user.save().then(() => {
    console.log('Registeration successful.');
    res.redirect('/dashboard');
  }).catch((e) => {
    console.log('Unable to register user.');
    res.status(400).send(e);
  })

}
