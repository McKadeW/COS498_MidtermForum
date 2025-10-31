const express = require('express');
const hbs = require('hbs');
const path = require('path');
const app = express();
const PORT = 3010;

// Configure Handlebars
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Register partials directory
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Static file serving, nginx will proxy traffic here
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.render('home', {
    title: 'Home',
    message: 'Welcome to the Homepage!'
  });
});

app.get('/comments', (req, res) => {
  res.render('comments', {
    title: 'Comments'
  });
});

app.post('/login', (req, res) => {
  res.render('login', {
    title: 'Login'
  });
});

app.get('/register', (req, res) => {
  res.render('register', {
    title: 'Register'
  });
});

app.post('/add_comment', (req, res) => {
  res.render('add_comment', {
    title: 'New Comment'
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});

