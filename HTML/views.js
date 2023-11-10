const express = require('express');
const passport = require('passport');
const session = require('express-session');
const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');
const flash = require('express-flash');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Sequelize and set up the database
const sequelize = new Sequelize('sqlite::memory:', {
  logging: false,
  dialect: 'sqlite',
});

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

const Note = sequelize.define('note', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  text: DataTypes.STRING,
});

User.hasMany(Note);
Note.belongsTo(User);

sequelize.sync({ force: true });

// Express middleware
app.use(express.json());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
}));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Routes
app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.send('Home page');
  } else {
    res.redirect('/login');
  }
});

app.post('/add-note', (req, res) => {
  if (req.isAuthenticated()) {
    const { note } = req.body;

    if (note.length < 1) {
      req.flash('error', 'Note too short');
      res.redirect('/');
    } else {
      Note.create({ text: note, userId: req.user.id })
        .then(() => {
          req.flash('success', 'Note added!');
          res.redirect('/');
        })
        .catch((error) => {
          console.error('Error adding note:', error);
          res.status(500).send('Internal Server Error');
        });
    }
  } else {
    res.redirect('/login');
  }
});

app.post('/delete-note', (req, res) => {
  if (req.isAuthenticated()) {
    const { noteId } = req.body;

    Note.findByPk(noteId)
      .then((note) => {
        if (note && note.userId === req.user.id) {
          return note.destroy()
            .then(() => {
              res.json({});
            })
            .catch((error) => {
              console.error('Error deleting note:', error);
              res.status(500).send('Internal Server Error');
            });
        }
        return res.status(403).send('Unauthorized');
      })
      .catch((error) => {
        console.error('Error finding note:', error);
        res.status(500).send('Internal Server Error');
      });
  } else {
    res.status(403).send('Unauthorized');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
