const express = require('express');
const jwt = require('jsonwebtoken')
const app = express();

app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];

const secretKey = "WQDasdqw123qwertySF"

const generateToken = (user) =>{
  const payload = {username: user.username}
  return jwt.sign(payload, secretKey, {expiresIn: '1h'})
}

const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization
  if(authHeader){
    const token = authHeader.split(' ')[1];
    jwt.verify(token,secretKey, (err, user)=>{
      if (err){
        return res.sendStatus(403)
      }
      res.user = user
      next()
    })
  }
  else{
    res.sendStatus(401)
  }
}


// Admin routes
app.post('/admin/signup', (req, res) => {
  const admin = req.body
  const adminAlreadyExists = ADMINS.find(a=> a.username === admin.username)
  if (adminAlreadyExists){
    res.status(403).send("Admin Already Exists.")
  }
  else{
    ADMINS.push(admin)
    const token = generateToken(admin)
    res.status(201).json({ message: 'Admin created successfully', token })
  }
});

app.post('/admin/login', (req, res) => {
  const {username, password} = req.headers
  const admin = ADMINS.find(a=> a.username === username && a.password === password)
  if (admin){
    const token = generateToken(admin)
    res.status(200).json({ message: 'Logged in successfully', token })
  }
  else{
    res.status(403).json({message: "Admin Authentication Failed"})
  }
});

app.post('/admin/courses', authenticateJwt, (req, res) => {
  // console.log(req.user.username)
  const course = req.body
  course.id = COURSES.length + 1
  COURSES.push(course);
  // console.log(COURSES)
  res.json({ message: 'Course created successfully', courseId: course.id })
});

app.put('/admin/courses/:courseId', authenticateJwt, (req, res) => {
  const courseId = parseInt(req.params.courseId)
  const course = COURSES.find(c=> c.id === courseId)
  if (course){
    Object.assign(course, req.body)
    res.json({ message: 'Course updated successfully.' })
  }
  else{
    res.json({message:"Course not found."})
  }
});

app.get('/admin/courses', authenticateJwt,(req, res) => {
  res.json({courses: COURSES})
});

// User routes
app.post('/users/signup', (req, res) => {
  const user = {
    username: req.body.username,
    password: req.body.password,
    purchasedCourses: []
  }
  const userExists = USERS.find(u=> u.username === user.username && u.password === user.password)
  if (userExists){
    res.status(403).send("User Already Exists.")
  }
  else{
    USERS.push(user)
    const token  = generateToken(user)
    res.status(201).json({ message: 'User created successfully', token })
  }
});

app.post('/users/login', (req, res) => {
  const { username, password } = req.headers;
  const user = USERS.find(u => u.username === username && u.password === password);
  if (user) {
    const token = generateToken(user);
    res.json({ message: 'Logged in successfully', token });
  } else {
    res.status(403).json({ message: 'User authentication failed' });
  }
});

app.get('/users/courses', authenticateJwt, (req, res) => {
  let filteredCourses = []
  for (let i =0 ; i< COURSES.length; i++){
    if (COURSES[i].published){
      filteredCourses.push(COURSES[i])
    }
  }
  // res.status(200).json({courses : COURSES.filter(c => c.published)})
  res.status(200).json({courses : filteredCourses})
});

app.post('/users/courses/:courseId', authenticateJwt, (req, res) => {
  const courseId = parseInt(req.params.courseId);
  const course = COURSES.find(c => c.id === courseId);
  if (course) {
    const user = USERS.find(u => u.username === req.user.username);
    if (user) {
      if (!user.purchasedCourses) {
        user.purchasedCourses = [];
      }
      user.purchasedCourses.push(course);
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
  if (user && user.purchasedCourses) {
    res.json({ purchasedCourses: user.purchasedCourses });
  } else {
    res.status(404).json({ message: 'No courses purchased' });
  }
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
