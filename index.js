const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const expressValidator = require('express-validator');
const mongojs = require('mongojs');
var db = mongojs('customerapp', ['users']);

const app = express();
// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// Set Static path
app.use(express.static(path.join(__dirname, 'public')));
// Express Validator Middleware





app.get('/', (req, res) => {
  db.users.find(function (err, docs) {
    res.render('index', {
      title: 'Customers',
      users: docs
    });
})

})

app.post('/users/add', (req, res) => {
  let newUser = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email
  }

  db.users.insert(newUser, (err, result) => {
    if(err) {
      console.log(err);
    }
    res.redirect('/');
  })
});

app.listen(3000, () => {
  console.log('Server started on Port 3000');
});
