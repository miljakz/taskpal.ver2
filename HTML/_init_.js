const express = require('express');
const Sequelize = require('sequelize');
const session = require('express-session');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { DataTypes } = require('sequelize');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Sequelize
const sequelize = new Sequelize({
  dialect: 'postgres',
  username: 'your_username',
  password: 'your_password',
  database: 'your_database_name',
  host: 'localhost', // or your database host
  port: 5432, // or your database port
});

// Define User model
const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
});

// Sync the database
sequelize.sync({ force: true }) // Set force to false in a production environment
  .then(() => {
    console.log('Database synchronized');
  })
  .catch((err) => {
    console.error('Database synchronization error: ', err);
  });

// Initialize Express middleware
app.use(express.json());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

// Passport configuration
passport.use(new localStrategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return done(null, false, { message: 'No user with that email' });
    }
    if (await bcrypt.compare(password, user.password)) {
      return done(null, user);
    } else {
      return done(null, false, { message: 'Password incorrect' });
    }
  }
));
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await User.findByPk(id);
  done(null, user);
});

// Routes
app.get('/', (req, res) => {
  res.send('Home page');
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
  failureFlash: true,
}));

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.get('/dashboard', (req, res) => {
  if (req.isAuthenticated()) {
    res.send('Dashboard');
  } else {
    res.redirect('/login');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
