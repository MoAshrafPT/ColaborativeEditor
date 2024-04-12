// Step 1: Install necessary packages
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Step 2: Set up an Express server
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
      req.user = null;
    } else {
      try {
        const decoded = jwt.verify(token, 'secretKey');
        req.user = decoded;
      } catch {
        req.user = null;
      }
    }
    next();
  });

// For simplicity, we'll use a hardcoded user
const user = {
  id: 1,
  username: 'user1',
  password: bcrypt.hashSync('password1', 10), // hashed password
};

// Step 3: Create a POST route for the login API
app.post('/auth/login', async (req, res) => {
  const { username, password } = req.body;

  // Check if the username exists
  if (username !== user.username) {
    return res.status(400).send('Invalid username or password');
  }

  // Step 4: Compare the incoming password with the hashed password
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).send('Invalid username or password');
  }

  // Step 5: If the password is correct, create a JWT and send it as a cookie
  const token = jwt.sign({ id: user.id }, 'secretKey', { expiresIn: '1h' });
  res.cookie('token', token, { httpOnly: true });
  res.json({ authenticated: true ,token: token});
 
});


app.get('/auth/check', (req, res) => {
    if (req.user) {
      res.json({ loggedIn: true });
    } else {
      res.json({ loggedIn: false });
    }
  });

// Start the server
app.listen(8080, () => console.log('Server running on port 8080'));