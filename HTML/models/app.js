// Import required modules and set up the application
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const { User, Note } = require('./models'); // Adjust the path as needed

// Set up the view engine (EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public'));

// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'your-secret-key', // Replace with your actual secret key
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Define the local strategy for user authentication
passport.use(
  new LocalStrategy((username, password, done) => {
    // Implement user authentication logic here
    // Example: Check the user's credentials in the database (User model)

    User.findOne({ username: username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect username' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password' });
      }
      return done(null, user);
    });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Define your routes (you can create separate route files if needed)
app.use('/', require('./routes/index')); // Adjust the path as needed

// db
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/your-database-name', { // Replace with your actual database name
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
