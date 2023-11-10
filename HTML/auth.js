const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Passport
const initializePassport = require('./passport-config');
initializePassport(passport);

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

// Mock User Database
const users = [];

// Routes
app.get('/', (req, res) => {
  res.render('index.ejs', { user: req.user });
});

app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login.ejs');
});

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

app.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/login');
});

app.get('/sign-up', checkNotAuthenticated, (req, res) => {
  res.render('signup.ejs');
});

app.post('/sign-up', checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    });
    res.redirect('/login');
  } catch {
    res.redirect('/sign-up');
  }
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  next();
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
