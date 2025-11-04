const express = require('express');
const hbs = require('hbs');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
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
app.use(cookieParser());
app.use(express.static('public'));

// Static file serving, nginx will proxy traffic here
app.use(express.static('public'));

// System "in-memory" data
// Array of objects { username: string, password: string }
const users = [];
// Array of objects { author: string, text: string, createdAt: Date }
const comments = [];
// An object { user: string, sessionId: string, expires: Date }
const session = {};

// Session Middleware
app.use(session({
  secret: 'not-so-secret-key-change-for-production',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60
  }
}));

// Routes ------------------------------

// Home page
app.get('/', (req, res) => {
  res.render('home', {
    title: 'Home',
    message: 'Welcome to the Homepage!'
  });
});

// Registration page
app.get('/register', (req, res) => {
  res.render('register', {
    title: 'Register'
  });
});

// Resgistration form
app.post('/register', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  
  // Verify a unique username
  for (let i = 0; i < users.length; i++){
	if (username === users[i].username){
	  res.redirect('/register?error=1');
	}
  }

  // If not taken add the user info to the DB
  // and redirect to the login page
  users.push({username, password});
  res.redirect('/login');
  
});

// Login page
app.get('/login', (req, res) => {
  res.render('login', {
    title: 'Login'
  });

});

// Login form
app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Simple authentication (in production, use proper password hashing)
  if (username && password) {
	// Set session data
        req.session.isLoggedIn = true;
        req.session.username = username;
        req.session.loginTime = new Date().toISOString();
        req.session.visitCount = 0;
        
        console.log(`User ${username} logged in at ${req.session.loginTime}`);
        res.redirect('/');
  } else {
        res.redirect('/login?error=1');
  }

/*
  let userFound = 0;
  // Verify that the user has an account
  for (let i = 0; i < users.length; i++){
        if (username === users[i].username && password === users[i].password){
          userFound = 1;
        }
  }

  // If the user info isn't found, they don't have 
  // an account. Redirect back to login page with error.
  if (!userFound){
	res.redirect('/login?error=1');	
  }
*/

});

// Logout action
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
	if (err) {
            console.log('Error destroying session:', err);
        }
        res.redirect('/');
  });
});

// Comments (main forum page)
app.get('/comments', (req, res) => {
  // Display the page and all currently posted comments
  res.render('comments', {
    title: 'Comments'//,
    //comments: comments
  });
});

/*
app.post('/add_comment', (req, res) => {
  res.render('add_comment', {
    title: 'New Comment'
  });
});
*/

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});

