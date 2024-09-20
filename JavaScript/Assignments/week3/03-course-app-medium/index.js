const { error } = require('console');
const express = require('express');
const app = express();
const fs = require('fs')
const jwt = require('jsonwebtoken')

app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];

// Read data from file, or initialize to empty array if file does not exist
try {
  ADMINS = JSON.parse(fs.readFile('admins.json', 'utf8'));
  USERS = JSON.parse(fs.readFile('users.json', 'utf8'));
  COURSES = JSON.parse(fs.readFile('courses.json', 'utf8'));
} catch {
  ADMINS = [];
  USERS = [];
  COURSES = [];
}
console.log(ADMINS);

const SECRET = "WQDasdqw123qwertySF"

const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, SECRET, (err, user) => {
      if (err) {
        return res.status(403).send('Authentication failed')
      }
      req.user = user
      next()
    })
  } else {
    res.status(401).send('Authentication failed')
  }
}

// Admin routes
app.post('/admin/signup', (req, res) => {
  const { username, password } = req.body;
  const admin = ADMINS.find(a => a.username === username);
  console.log("admin signup");
  if (admin) {
    res.status(403).json({ message: 'Admin already exists' });
  } else {
    const newAdmin = { username, password };
    ADMINS.push(newAdmin);

    fs.writeFile('Files/admins.json', JSON.stringify(ADMINS, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error writing file' });
      }

      const token = jwt.sign({ username, role: "admin" }, SECRET, { expiresIn: "1h" });
      res.json({ message: "Admin created successfully", token });
    });
  }
});


app.post('/admin/login', (req, res) => {
  const { username, password } = req.headers
  const admin = ADMINS.find(a => a.username === username && a.password === password)
  console.log("")
  if (admin) {
    const token = jwt.sign({ username, role: "admin" }, SECRET, { expiresIn: '1h' })
    res.json({ message: "Logged in successfully", token })
  } else {
    res.json({ message: "Invalid username or passowrd" })
  }
});

app.post('/admin/courses', authenticateJwt, (req, res) => {
  const course = req.body
  course.id = Date.now()
  COURSES.push(course)
  fs.writeFile('Files/courses.json', JSON.stringify(COURSES, null, 2), (err) => {
    if (err) {
      res.status(500).json({ message: 'Error writing file' });
    }
    res.json({ message: "Courses created successfully", courseId: course.id })
  })
});

app.put('/admin/courses/:courseId',authenticateJwt, (req, res) => {
  const course = COURSES.find(c => c.id === parseInt(req.params.courseId))
  if (course) {
    Object.assign(course, req.body)
    fs.writeFile('File/courses.json', JSON.stringify(COURSES, null, 2), (err) => {
      if (err) res.json({ message: 'Error writing file' });
    })
    res.json({ message: 'Course updated successfully' });
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});

app.get('/admin/courses', authenticateJwt,(req, res) => {
  res.json({ courses: COURSES });
});

// User routes
app.post('/users/signup', (req, res) => {
  const { username, password } = req.body;
  const user = USERS.find(u => u.username === username);
  if (user) {
    res.status(403).json({ message: 'User already exists' });
  } else {
    const newUser = { username, password };
    USERS.push(newUser);
    fs.writeFileSync('users.json', JSON.stringify(USERS));
    const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
    res.json({ message: 'User created successfully', token });
  }
});

app.post('/users/login', (req, res) => {
  const { username, password } = req.headers;
  const user = USERS.find(u => u.username === username && u.password === password);
  if (user) {
    const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
    res.json({ message: 'Logged in successfully', token });
  } else {
    res.status(403).json({ message: 'Invalid username or password' });
  }
});

app.get('/users/courses', authenticateJwt, (req, res) => {
  res.json({ courses: COURSES });
});

app.post('/users/courses/:courseId', authenticateJwt, (req, res) => {
  const course = COURSES.find(c => c.id === parseInt(req.params.courseId));
  if (course) {
    const user = USERS.find(u => u.username === req.user.username);
    if (user) {
      if (!user.purchasedCourses) {
        user.purchasedCourses = [];
      }
      user.purchasedCourses.push(course);
      fs.writeFile('users.json', JSON.stringify(USERS));
      res.json({ message: 'Course purchased successfully' });
    } else {
      res.status(403).json({ message: 'User not found' });
    }
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});

app.get('/users/purchasedCourses', authenticateJwt, (req, res) => {
  const user = USERS.find(u => u.username === req.user.username);
  if (user) {
    res.json({ purchasedCourses: user.purchasedCourses || [] });
  } else {
    res.status(403).json({ message: 'User not found' });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
